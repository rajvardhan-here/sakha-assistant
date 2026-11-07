import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

export const detectIntent = async (message) => {
  const now = new Date();
  const nowIST = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  const systemPrompt = `You are an intent classifier for an assistant called SAKHA.
Current date and time (India, IST): ${nowIST}

Classify the user's message into exactly one of these types:
- "chat": general conversation, opinions, or anything not requiring real-time data or a task
- "search": user is asking about current/real-time info — weather, live sports scores, news, stock prices, or any fact that could have changed recently
- "memory": user is sharing a personal fact, preference, or explicit instruction to remember something about themselves (e.g. "my name is Raj", "remember I have a dog named Rocky", "I don't like spicy food", "my birthday is 15 August")
- "note": user wants to save a note (e.g. "add a note: buy milk")
- "reminder": user wants to be reminded of something at a specific time
- "alarm": user wants an alarm set
- "event": user wants a calendar event added

Respond with ONLY valid JSON, no explanation, no markdown, in this exact format:
{"type": "chat|search|memory|note|reminder|alarm|event", "content": "short description or search query or memory fact", "dueDate": "ISO 8601 datetime string or null"}

Rules:
- For "chat", set content to "" and dueDate to null.
- For "search", content should be a clean, focused search query.
- For "memory", content should be a clean, third-person restatement of the fact (e.g. "User's name is Raj", "User has a dog named Rocky", "User dislikes spicy food"). dueDate is always null.
- For "note", dueDate is always null.
- For "reminder", "alarm", "event": compute dueDate based on current date/time given above. If only a time is mentioned and it has already passed today, use tomorrow's date.
- Always return valid ISO 8601 format for dueDate when applicable.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: MODEL,
      temperature: 0.1,
      max_tokens: 1000,
      reasoning_effort: "low",
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    if (!["chat", "search", "memory", "note", "reminder", "alarm", "event"].includes(parsed.type)) {
      return { type: "chat", content: "", dueDate: null };
    }

    return parsed;
  } catch (error) {
    console.error("Intent detection error:", error.message);
    return { type: "chat", content: "", dueDate: null };
  }
};
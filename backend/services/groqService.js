import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getGroqResponse = async (history) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are SAKHA, a warm, friendly AI companion — like a close friend, not a formal assistant. Talk casually and naturally, use short conversational sentences, show genuine interest, and avoid sounding robotic or overly formal. Don't use markdown formatting (no asterisks, no bullet points, no headers) — just plain natural sentences, since your replies are also spoken aloud. Keep replies concise unless the person asks for detail.",
        },
        ...history,
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.8,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Sorry, no response generated.";
  } catch (error) {
    console.error("Groq API error:", error.message);
    throw new Error("Failed to get response from SAKHA");
  }
};
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Task from "../models/Task.js";
import { getGroqResponse } from "../services/groqService.js";
import { detectIntent } from "../services/intentService.js";

export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({ userId: req.userId, title: "New Chat" });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.chatId, userId: req.userId });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const messages = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const typeLabels = {
  note: "📝 Note saved",
  reminder: "⏰ Reminder set",
  alarm: "⏰ Alarm set",
  event: "📅 Event added",
};

const formatDueDate = (dueDate) => {
  if (!dueDate) return "";
  const d = new Date(dueDate);
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
      return res.status(400).json({ error: "chatId and content are required" });
    }

    const chat = await Chat.findOne({ _id: chatId, userId: req.userId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const userMessage = await Message.create({
      chatId,
      role: "user",
      content,
    });

    // Step 1: Detect intent
    const intent = await detectIntent(content);

    let aiReply;

    if (intent.type === "chat") {
      // Normal conversation — go through Groq chat as before
      const pastMessages = await Message.find({ chatId }).sort({ createdAt: 1 });
      const history = pastMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      aiReply = await getGroqResponse(history);
    } else {
      // Task command — save to Task collection, respond with confirmation
      const task = await Task.create({
        userId: req.userId,
        type: intent.type,
        content: intent.content || content,
        dueDate: intent.dueDate || null,
      });

      const label = typeLabels[intent.type] || "Task saved";
      const dueText = task.dueDate ? ` for ${formatDueDate(task.dueDate)}` : "";
      aiReply = `${label}: "${task.content}"${dueText} ✅`;
    }

    const assistantMessage = await Message.create({
      chatId,
      role: "assistant",
      content: aiReply,
    });

    if (chat.title === "New Chat") {
      chat.title = content.slice(0, 40);
      await chat.save();
    }

    res.json({ userMessage, assistantMessage });
  } catch (error) {
    console.error("sendMessage error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
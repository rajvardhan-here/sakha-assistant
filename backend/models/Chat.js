import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, default: "New Chat" },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
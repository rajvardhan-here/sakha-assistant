import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createChat,
  getAllChats,
  getChatMessages,
  sendMessage,
  togglePinChat,
  deleteChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/chats", createChat);
router.get("/chats", getAllChats);
router.get("/chats/:chatId/messages", getChatMessages);
router.post("/message", sendMessage);
router.patch("/chats/:chatId/pin", togglePinChat);
router.delete("/chats/:chatId", deleteChat);

export default router;
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createChat,
  getAllChats,
  getChatMessages,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

router.use(authMiddleware); // all routes below require login

router.post("/chats", createChat);
router.get("/chats", getAllChats);
router.get("/chats/:chatId/messages", getChatMessages);
router.post("/message", sendMessage);

export default router;
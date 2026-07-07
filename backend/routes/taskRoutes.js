import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllTasks,
  toggleTaskComplete,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/tasks", getAllTasks);
router.patch("/tasks/:id/complete", toggleTaskComplete);
router.delete("/tasks/:id", deleteTask);

export default router;
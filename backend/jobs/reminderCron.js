import cron from "node-cron";
import Task from "../models/Task.js";

export const startReminderCron = () => {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const dueTasks = await Task.find({
        type: { $in: ["reminder", "alarm", "event"] },
        dueDate: { $lte: now },
        notified: false,
        completed: false,
      });

      for (const task of dueTasks) {
        console.log(`🔔 Reminder due for user ${task.userId}: "${task.content}"`);
        task.notified = true;
        await task.save();
      }
    } catch (error) {
      console.error("Reminder cron error:", error.message);
    }
  });

  console.log("⏱️  Reminder cron job started (checks every minute)");
};
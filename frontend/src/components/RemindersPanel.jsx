import { useEffect, useState } from "react";
import { getAllTasks, toggleTaskComplete, deleteTask } from "../api/api.js";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const typeIcons = {
  reminder: "⏰",
  alarm: "⏰",
  event: "📅",
  note: "📝",
};

function RemindersPanel() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    const data = await getAllTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggle = async (id) => {
    await toggleTaskComplete(id);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="reminders-panel">
      <h2>Reminders & Tasks</h2>

      {loading && <p className="empty-text">Loading...</p>}

      {!loading && tasks.length === 0 && (
        <p className="empty-text">No reminders yet. Try telling SAKHA something like "remind me to call mom at 5pm"</p>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task._id)}
            />
            <div className="task-info">
              <div className="task-content">
                {typeIcons[task.type]} {task.content}
              </div>
              {task.dueDate && (
                <div className="task-date">{formatDate(task.dueDate)}</div>
              )}
            </div>
            <button className="task-delete" onClick={() => handleDelete(task._id)}>
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RemindersPanel;
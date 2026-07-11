import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getAllMemories, deleteMemory } from "../api/api.js";

function SettingsModal({ onClose }) {
  const { user, logout, calendarConnected } = useAuth();
  const [memories, setMemories] = useState([]);
  const [showMemories, setShowMemories] = useState(false);

  useEffect(() => {
    if (showMemories) {
      getAllMemories().then(setMemories);
    }
  }, [showMemories]);

  const handleDeleteMemory = async (id) => {
    await deleteMemory(id);
    setMemories((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>Settings</h3>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-section">
          <div className="settings-label">Account</div>
          <div className="settings-sub">{user?.email}</div>
        </div>

        <div className="settings-section">
          <div className="settings-label">Google Calendar</div>
          <div className="settings-sub">
            {calendarConnected ? "🟢 Connected" : "🔴 Not connected — log out and log in again"}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-label" style={{ cursor: "pointer" }} onClick={() => setShowMemories(!showMemories)}>
            🧠 What SAKHA remembers about you {showMemories ? "▲" : "▼"}
          </div>
          {showMemories && (
            <div className="memory-list">
              {memories.length === 0 && <div className="settings-sub">Nothing saved yet.</div>}
              {memories.map((m) => (
                <div key={m._id} className="memory-item">
                  <span>{m.content}</span>
                  <button onClick={() => handleDeleteMemory(m._id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="settings-section">
          <div className="settings-label">About</div>
          <div className="settings-sub">SAKHA v1.0 — your AI companion</div>
        </div>

        <button className="settings-logout" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default SettingsModal;
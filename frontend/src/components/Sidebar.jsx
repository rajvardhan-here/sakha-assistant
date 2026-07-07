import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { togglePinChat, deleteChat } from "../api/api.js";

function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, view, onChangeView, onChatsUpdated, onOpenSettings }) {
  const { user, logout } = useAuth();
  const [menuState, setMenuState] = useState(null); // { chatId, top, left }

  const handleMenuToggle = (e, chatId) => {
    e.stopPropagation();
    if (menuState?.chatId === chatId) {
      setMenuState(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuState({ chatId, top: rect.bottom + 4, left: rect.left - 110 });
  };

  const handlePin = async (e, chatId) => {
    e.stopPropagation();
    await togglePinChat(chatId);
    setMenuState(null);
    onChatsUpdated();
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    if (confirm("Delete this chat?")) {
      await deleteChat(chatId);
      setMenuState(null);
      onChatsUpdated();
    }
  };

  return (
    <div className="sidebar" onClick={() => setMenuState(null)}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">SAKHA</span>
        </div>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <span>+</span> New chat
      </button>

      <div className="sidebar-nav">
        <div className={`nav-item ${view === "chat" ? "active" : ""}`} onClick={() => onChangeView("chat")}>
          💬 Assistant
        </div>
        <div className={`nav-item ${view === "reminders" ? "active" : ""}`} onClick={() => onChangeView("reminders")}>
          ⏰ Reminders
        </div>
      </div>

      {view === "chat" && (
        <>
          <div className="chats-label">Chats</div>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item ${chat._id === activeChatId ? "active" : ""}`}
                onClick={() => onSelectChat(chat._id)}
              >
                <span className="chat-item-text">
                  {chat.pinned ? "📌 " : ""}
                  {chat.title}
                </span>
                <button className="chat-menu-btn" onClick={(e) => handleMenuToggle(e, chat._id)}>
                  ⋮
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {menuState && (
        <div
          className="chat-menu-dropdown"
          style={{ top: menuState.top, left: menuState.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="chat-menu-item" onClick={(e) => handlePin(e, menuState.chatId)}>
            📌 {chats.find((c) => c._id === menuState.chatId)?.pinned ? "Unpin" : "Pin"}
          </div>
          <div className="chat-menu-item delete" onClick={(e) => handleDelete(e, menuState.chatId)}>
            🗑 Delete
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="profile" className="user-avatar-img" />
        ) : (
          <div className="user-avatar">{user?.displayName?.[0] || "U"}</div>
        )}
        <span className="user-name">{user?.displayName || user?.email}</span>
        <button className="settings-btn" onClick={onOpenSettings} title="Settings">
          ⚙
        </button>
        <button className="logout-btn" onClick={logout} title="Logout">
          ⎋
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
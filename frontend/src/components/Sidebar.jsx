import { useAuth } from "../context/AuthContext.jsx";

function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, view, onChangeView }) {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">SAKHA</span>
        </div>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        + New chat
      </button>

      <div className="sidebar-nav">
        <div
          className={`nav-item ${view === "chat" ? "active" : ""}`}
          onClick={() => onChangeView("chat")}
        >
          💬 Assistant
        </div>
        <div
          className={`nav-item ${view === "reminders" ? "active" : ""}`}
          onClick={() => onChangeView("reminders")}
        >
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
                💬 {chat.title}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="sidebar-footer">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="profile" className="user-avatar-img" />
        ) : (
          <div className="user-avatar">{user?.displayName?.[0] || "U"}</div>
        )}
        <span className="user-name">{user?.displayName || user?.email}</span>
        <button className="logout-btn" onClick={logout} title="Logout">
          ⎋
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
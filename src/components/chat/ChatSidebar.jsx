import React from "react";
import "./ChatSidebar.css";
import ConfirmModal from "../ui/ConfirmModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatSidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  open,
  socket,
}) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const doLogout = () => {
    // Disconnect socket before logout
    if (socket) {
      socket.disconnect();
    }
    try {
      // Clear all cookies for current domain (best-effort)
      document.cookie.split(";").forEach(function (c) {
        const name = c.split("=")[0].trim();
        document.cookie = name + "=; Max-Age=0; path=/";
        document.cookie =
          name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      });
    } catch (e) {}
    try {
      localStorage.clear();
    } catch (e) {}
    try {
      sessionStorage.clear();
    } catch (e) {}
    navigate("/login");
  };

  return (
    <aside
      className={"chat-sidebar " + (open ? "open" : "")}
      aria-label="Previous chats"
    >
      <div className="sidebar-header">
        <h2>Chats</h2>
        <button className="small-btn" onClick={onNewChat}>
          New
        </button>
      </div>
      <nav className="chat-list" aria-live="polite">
        {chats.map((c) => (
          <button
            key={c._id}
            className={
              "chat-list-item " + (c._id === activeChatId ? "active" : "")
            }
            onClick={() => onSelectChat(c._id)}
          >
            <span className="title-line">{c.title}</span>
            <span className="meta-line">
              {c.messages?.length ?? 0} msg
              {(c.messages?.length ?? 0) !== 1 && "s"}
            </span>
          </button>
        ))}
        {chats.length === 0 && <p className="empty-hint">No chats yet.</p>}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => setConfirmOpen(true)}>
          Log out
        </button>
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="Log out"
        message="Are you sure you want to log out?"
        cancelLabel="Cancel"
        confirmLabel="Log out"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          doLogout();
        }}
      />
    </aside>
  );
};

export default ChatSidebar;

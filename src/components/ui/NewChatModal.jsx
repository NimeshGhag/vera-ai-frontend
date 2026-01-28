import React, { useState } from "react";
import "./NewChatModal.css";

const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [chatTitle, setChatTitle] = useState("");

  const handleCreate = () => {
    if (chatTitle.trim()) {
      onCreateChat(chatTitle.trim());
      setChatTitle("");
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Chat</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          <label htmlFor="chat-title">Chat Title (optional)</label>
          <input
            id="chat-title"
            type="text"
            placeholder="Enter chat title or press Enter to use default"
            value={chatTitle}
            onChange={(e) => setChatTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-create" onClick={handleCreate}>
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;

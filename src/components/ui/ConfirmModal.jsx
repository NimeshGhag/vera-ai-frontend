import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
  open,
  title = "Confirm",
  message = "",
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Log out",
}) => {
  if (!open) return null;

  return (
    <div className="cm-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="cm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="cm-title" className="cm-title">
          {title}
        </h3>
        {message && <div className="cm-message">{message}</div>}
        <div className="cm-actions">
          <button className="cm-btn cm-cancel" type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className="cm-btn cm-confirm"
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

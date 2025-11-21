import React, { useEffect } from "react";
import "./toast.css";

export default function Toast({ show, message, type = "success", onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto hides in 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-message">{message}</div>
    </div>
  );
}

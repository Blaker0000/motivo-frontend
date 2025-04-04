import React, { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#333";

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: bgColor,
        color: "white",
        padding: "10px 16px",
        borderRadius: "6px",
        zIndex: 9999,
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        minWidth: "200px",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}
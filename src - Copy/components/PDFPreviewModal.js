import React from "react";

export default function PDFPreviewModal({ url, onClose }) {
  if (!url) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "90%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
          }}
        >
          ✖ Close
        </button>
        <iframe
          title="PDF Preview"
          src={url}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
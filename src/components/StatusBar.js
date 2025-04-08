
import React, { useEffect, useState } from "react";

export default function StatusBar() {
  const [status, setStatus] = useState({ flask: "🟡", gpt: "🟡", smartsheet: "🟡" });

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://motivo-backend.onrender.com/api/status");
      const data = await res.json();
      setStatus(data.services || {});
    } catch (err) {
      setStatus({ flask: "🔴", gpt: "🔴", smartsheet: "🔴" });
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: "8px 16px",
      background: "#f8f8f8",
      borderBottom: "1px solid #ccc",
      display: "flex",
      gap: "20px",
      fontSize: "14px",
      alignItems: "center",
    }}>
      <strong>System Status:</strong>
      <span>Flask {status.flask}</span>
      <span>GPT {status.gpt}</span>
      <span>SmartSheet {status.smartsheet}</span>
    </div>
  );
}

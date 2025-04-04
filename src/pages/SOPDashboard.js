import React, { useEffect, useState } from "react";
import StatusBar from "../components/StatusBar";
import Toast from "../components/Toast";
import PDFPreviewModal from "../components/PDFPreviewModal";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SOPDashboard() {
  const [sops, setSops] = useState([]);
  const [command, setCommand] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sopIdForUpload, setSopIdForUpload] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSOPs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sops");
      const data = await res.json();
      setSops(data.sops || []);
    } catch (err) {
      showToast("Failed to load SOPs", "error");
    }
  };

  useEffect(() => {
    fetchSOPs();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !sopIdForUpload) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("sop_id", sopIdForUpload);
    try {
      const res = await fetch("http://localhost:5000/api/sops/upload_pdf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      showToast(data.message || "Upload complete", "success");
      fetchSOPs();
    } catch (err) {
      showToast("Upload failed", "error");
    }
  };

  const handleSummarize = async (sopId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/sops/summarize_pdf/${sopId}`, {
        method: "POST",
      });
      const data = await res.json();
      showToast(data.message || "Summary complete", "success");
      fetchSOPs();
    } catch (err) {
      showToast("Summarization failed", "error");
    }
  };

  const handlePushToSmartSheet = async (sopId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/sops/insert_to_smartsheet/${sopId}`, {
        method: "POST",
      });
      const data = await res.json();
      showToast(data.message || "SmartSheet insert complete", "success");
    } catch (err) {
      showToast("SmartSheet insert failed", "error");
    }
  };

  const handleCommand = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sops/chat_command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      showToast(data.message || "Command complete", "success");
      fetchSOPs();
    } catch (err) {
      showToast("Command failed", "error");
    }
  };

  const statusData = [
    { name: "Active", value: sops.filter(s => s.status === "Active").length },
    { name: "Missing Summary", value: sops.filter(s => !s.summary).length },
    { name: "No PDF Link", value: sops.filter(s => !s.link_to_pdf).length },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <StatusBar />
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>📋 SOP Dashboard</h1>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => \`\${name}: \${(percent * 100).toFixed(0)}%\`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="SOP ID (e.g., MG-SOP-0080)"
            value={sopIdForUpload}
            onChange={(e) => setSopIdForUpload(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ marginRight: "10px" }}
          />
          <button onClick={handleUpload} style={{ padding: "8px 16px" }}>Upload PDF</button>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <input
            placeholder="Type command (e.g. !add_sop MG-SOP-0090 Title)"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            style={{ padding: "8px", width: "400px", marginRight: "10px" }}
          />
          <button onClick={handleCommand} style={{ padding: "8px 16px" }}>Run Command</button>
        </div>

        <div>
          {sops.map((sop) => (
            <div key={sop.document_number} style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{sop.title}</h2>
              <p style={{ fontSize: "14px", color: "#666" }}>{sop.status}</p>
              <p>{sop.summary || "No summary yet."}</p>
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleSummarize(sop.document_number)} style={{ marginRight: "10px" }}>
                  Summarize
                </button>
                <button onClick={() => handlePushToSmartSheet(sop.document_number)} style={{ marginRight: "10px" }}>
                  Push to SmartSheet
                </button>
                <button onClick={() => setPreviewUrl(sop.link_to_pdf)} style={{ marginRight: "10px" }}>
                  👁 Preview
                </button>
                <a href={sop.link_to_pdf} target="_blank" rel="noreferrer">🔗 Open</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PDFPreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
    </div>
  );
}
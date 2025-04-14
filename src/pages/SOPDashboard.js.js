
import React, { useState } from 'react';

const SOPDashboard = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);

  const handleCommand = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });
      const data = await res.json();
      const newHistory = [...history, { command, response: data }];
      setHistory(newHistory);
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("❌ Chatbot failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Motivo AI Chatbot Dashboard</h1>
      <input
        type="text"
        placeholder="Type a command (e.g. /generate work plan)"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        style={{ width: '70%', padding: 10 }}
      />
      <button onClick={handleCommand} style={{ padding: 10, marginLeft: 10 }}>Submit</button>
      <pre style={{ marginTop: 20 }}>{response}</pre>
      <h3>History</h3>
      <ul>
        {history.map((entry, idx) => (
          <li key={idx}><strong>{entry.command}</strong><br />{JSON.stringify(entry.response)}</li>
        ))}
      </ul>
    </div>
  );
};

export default SOPDashboard;

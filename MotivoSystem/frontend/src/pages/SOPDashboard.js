import React, { useState } from 'react';

const SOPDashboard = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState(null);

  const handleCommand = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📘 Motivo AI Chatbot</h2>
      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Type a command (e.g. /generate work plan)"
        style={{ width: '60%', padding: '0.5rem', marginRight: '1rem' }}
      />
      <button onClick={handleCommand}>Submit</button>

      {response && (
        <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem' }}>
          <h4>🤖 Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SOPDashboard;

import React, { useState, useEffect } from 'react';

function App() {
  const [sops, setSOPs] = useState([]);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/sops')
      .then(res => res.json())
      .then(data => setSOPs(data))
      .catch(err => console.error('Failed to load SOPs:', err));
  }, []);

  const handleCommand = () => {
    setResponse(`🤖 Processing command: ${query}`);
    setTimeout(() => {
      setResponse(`🧠 AI Response: Work plan generated.`);
    }, 1000);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Motivo AI SOP Dashboard</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder='/generate work plan' className='p-2 border w-full' />
      <button onClick={handleCommand} className='bg-blue-600 text-white px-4 py-2 rounded mt-2'>Submit</button>
      {response && <div className='mt-2 p-2 bg-gray-100'>{response}</div>}
      <table className='w-full mt-6 border'>
        <thead><tr><th className='border p-2'>Title</th><th className='border p-2'>Status</th><th className='border p-2'>Owner</th></tr></thead>
        <tbody>{sops.map((s, i) => <tr key={i}><td className='border p-2'>{s[0]}</td><td className='border p-2'>{s[1]}</td><td className='border p-2'>{s[2]}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default App;
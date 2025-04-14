import React, { useEffect, useState } from 'react';
import PDFPreviewModal from '../components/PDFPreviewModal.js';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { StatusBar } from '@/components/ui/status-bar';
// import { Toast } from '@/components/ui/toast';

const dummyData = [
  { name: 'Complete', value: 60 },
  { name: 'In Progress', value: 25 },
  { name: 'Not Started', value: 15 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF4444'];

const SOPDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const handlePreview = (url) => {
    setPdfUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SOP Dashboard</h1>

      {/* Example PDF Preview Button */}
      <button
        onClick={() => handlePreview('https://example.com/sample.pdf')}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Preview SOP PDF
      </button>

      {/* Chart Example */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dummyData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {dummyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* PDF Modal */}
      <PDFPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={pdfUrl}
      />
    </div>
  );
};

export default SOPDashboard;

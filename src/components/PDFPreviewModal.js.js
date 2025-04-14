// src/components/PDFPreviewModal.js
import React from 'react';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  width: '80%',
  height: '80%',
  boxShadow: '0 0 10px rgba(0,0,0,0.25)',
};

const PDFPreviewModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2>PDF Preview</h2>
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          style={{ width: '100%', height: '85%', border: '1px solid #ccc' }}
        />
        <button onClick={onClose} style={{ marginTop: '1rem' }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PDFPreviewModal;

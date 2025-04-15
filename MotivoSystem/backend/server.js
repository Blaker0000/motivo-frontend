
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/sops', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.smartsheet.com/2.0/sheets/${process.env.SMARTSHEET_SOP_SHEET_ID}`,
      { headers: { Authorization: `Bearer ${process.env.SMARTSHEET_API_KEY}` } }
    );
    const rows = response.data.rows.map(row => {
      const rowData = {};
      row.cells.forEach(cell => {
        rowData[cell.columnId] = cell.displayValue;
      });
      return rowData;
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch SOPs' });
  }
});

app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));

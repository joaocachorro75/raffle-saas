const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

const db = require('./database');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/raffles', require('./routes/raffles'));

// Serve React build
app.use(express.static(path.join(__dirname, '../build')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

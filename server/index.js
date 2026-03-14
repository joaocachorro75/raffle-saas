const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/raffles', require('./routes/raffles'));
app.use('/api/tickets', require('./routes/tickets'));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/raffle-saas')
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro MongoDB:', err));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(\`Servidor rodando na porta \${PORT}\`));

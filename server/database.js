const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Garante que a pasta data existe
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'raffles.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('✅ Conectado ao banco SQLite:', dbPath);
  }
});

// Cria tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS raffles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      theme TEXT DEFAULT 'tigrinho',
      prize TEXT NOT NULL,
      price REAL NOT NULL,
      total_numbers INTEGER DEFAULT 100,
      end_date DATETIME,
      status TEXT DEFAULT 'ativa',
      winner INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.log('Tabela raffles já existe');
    else console.log('✅ Tabela raffles criada');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      raffle_id INTEGER NOT NULL,
      number INTEGER NOT NULL,
      buyer_name TEXT,
      buyer_phone TEXT,
      sold_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (raffle_id) REFERENCES raffles(id)
    )
  `, (err) => {
    if (err) console.log('Tabela tickets já existe');
    else console.log('✅ Tabela tickets criada');
  });
});

module.exports = db;

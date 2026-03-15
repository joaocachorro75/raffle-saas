const sqlite3 = require('sqlite3').default;
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'data', 'raffles.db'));

// Cria tabelas
db.serialize(`
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    raffle_id INTEGER NOT NULL,
    number INTEGER NOT NULL,
    buyer_name TEXT,
    buyer_phone TEXT,
    sold_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (raffle_id) REFERENCES raffles(id)
  );
`).catch(err => console.log('Tabelas já existem:', err));

module.exports = db;
const router = require('express').Router();
const db = require('../database');

// Listar todas as rifas ativas
router.get('/', (req, res) => {
  db.all(`SELECT * FROM raffles WHERE status = 'ativa' ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar nova rifa
router.post('/', (req, res) => {
  const { title, description, theme, prize, price, total_numbers, end_date } = req.body;
  
  db.run(`
    INSERT INTO raffles (title, description, theme, prize, price, total_numbers, end_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'ativa')
  `, [title, description, theme, prize, price, total_numbers, end_date], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, description, theme, prize, price, total_numbers, end_date, status: 'ativa' });
  });
});

// Buscar rifa por ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM raffles WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Rifa não encontrada' });
    
    // Buscar números vendidos
    db.all('SELECT number, buyer_name, buyer_phone FROM tickets WHERE raffle_id = ?', [req.params.id], (err, tickets) => {
      if (err) return res.status(500).json({ error: err.message });
      const soldNumbers = tickets.map(t => t.number);
      res.json({ ...row, soldNumbers, tickets });
    });
  });
});

// Comprar número
router.post('/:id/buy', (req, res) => {
  const { number, buyer_name, buyer_phone } = req.body;
  const raffleId = req.params.id;
  
  // Verificar se número já existe
  db.get('SELECT * FROM tickets WHERE raffle_id = ? AND number = ?', [raffleId, number], (err, ticket) => {
    if (err) return res.status(500).json({ error: err.message });
    if (ticket) return res.status(400).json({ error: 'Número já vendido' });
    
    // Criar ticket
    db.run('INSERT INTO tickets (raffle_id, number, buyer_name, buyer_phone) VALUES (?, ?, ?, ?)', [raffleId, number, buyer_name, buyer_phone], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Número comprado com sucesso!', number, buyer_name, buyer_phone });
    });
  });
});

// Listar tickets de uma rifa
router.get('/:id/tickets', (req, res) => {
  db.all('SELECT * FROM tickets WHERE raffle_id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Sortear vencedor
router.post('/:id/draw', (req, res) => {
  const raffleId = req.params.id;
  
  db.all('SELECT number, buyer_name, buyer_phone FROM tickets WHERE raffle_id = ?', [raffleId], (err, tickets) => {
    if (err) return res.status(500).json({ error: err.message });
    if (tickets.length === 0) return res.status(400).json({ error: 'Nenhum número vendido' });
    
    const winnerTicket = tickets[Math.floor(Math.random() * tickets.length)];
    
    db.run('UPDATE raffles SET status = ?, winner = ? WHERE id = ?', ['finalizada', winnerTicket.number, raffleId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ 
        winner: winnerTicket.number,
        winner_name: winnerTicket.buyer_name,
        winner_phone: winnerTicket.buyer_phone
      });
    });
  });
});

// Deletar rifa
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tickets WHERE raffle_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    db.run('DELETE FROM raffles WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Rifa deletada com sucesso' });
    });
  });
});

module.exports = router;

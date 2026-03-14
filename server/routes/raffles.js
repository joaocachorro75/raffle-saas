const router = require('express').Router();
const Raffle = require('../models/Raffle');

// Listar todas as rifas
router.get('/', async (req, res) => {
  try {
    const raffles = await Raffle.find({ status: 'ativa' });
    res.json(raffles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar nova rifa
router.post('/', async (req, res) => {
  try {
    const raffle = new Raffle(req.body);
    await raffle.save();
    res.status(201).json(raffle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar rifa por ID
router.get('/:id', async (req, res) => {
  try {
    const raffle = await Raffle.findById(req.params.id);
    if (!raffle) return res.status(404).json({ error: 'Rifa não encontrada' });
    res.json(raffle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comprar número
router.post('/:id/buy', async (req, res) => {
  try {
    const { number } = req.body;
    const raffle = await Raffle.findById(req.params.id);
    
    if (raffle.soldNumbers.includes(number)) {
      return res.status(400).json({ error: 'Número já vendido' });
    }
    
    raffle.soldNumbers.push(number);
    await raffle.save();
    
    res.json({ message: 'Número comprado com sucesso!', number });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sortear vencedor
router.post('/:id/draw', async (req, res) => {
  try {
    const raffle = await Raffle.findById(req.params.id);
    
    if (raffle.soldNumbers.length === 0) {
      return res.status(400).json({ error: 'Nenhum número vendido' });
    }
    
    const randomIndex = Math.floor(Math.random() * raffle.soldNumbers.length);
    raffle.winner = raffle.soldNumbers[randomIndex];
    raffle.status = 'finalizada';
    await raffle.save();
    
    res.json({ winner: raffle.winner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

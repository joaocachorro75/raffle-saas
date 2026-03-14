const mongoose = require('mongoose');

const RaffleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  theme: { 
    type: String, 
    required: true,
    enum: ['tigrinho', 'superherois', 'fazendinha', 'festivo', 'personalizado']
  },
  prize: { type: String, required: true },
  prizeImage: { type: String },
  price: { type: Number, required: true },
  totalNumbers: { type: Number, required: true, default: 100 },
  soldNumbers: [{ type: Number }],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['ativa', 'finalizada', 'cancelada'],
    default: 'ativa'
  },
  winner: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Raffle', RaffleSchema);

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRaffle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: 'tigrinho',
    prize: '',
    price: '',
    totalNumbers: 100,
    endDate: ''
  });

  const themes = [
    { value: 'tigrinho', label: '🐅 Tigrinho' },
    { value: 'superherois', label: '🦸 Super Heróis' },
    { value: 'fazendinha', label: '🚜 Fazendinha' },
    { value: 'festivo', label: '🎉 Festivo' },
    { value: 'personalizado', label: '✨ Personalizado' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/raffles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          endDate: new Date(formData.endDate)
        })
      });
      
      if (response.ok) {
        const raffle = await response.json();
        navigate(`/rifa/${raffle._id}`);
      }
    } catch (error) {
      console.error('Erro ao criar rifa:', error);
    }
  };

  return (
    <div className="create-raffle">
      <h1>Criar Nova Rifa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da Rifa"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        
        <textarea
          placeholder="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        
        <select
          value={formData.theme}
          onChange={(e) => setFormData({...formData, theme: e.target.value})}
        >
          {themes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Prêmio"
          value={formData.prize}
          onChange={(e) => setFormData({...formData, prize: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Valor do Bilhete (R$)"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Quantidade de Números"
          value={formData.totalNumbers}
          onChange={(e) => setFormData({...formData, totalNumbers: e.target.value})}
        />
        
        <input
          type="datetime-local"
          value={formData.endDate}
          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          required
        />
        
        <button type="submit" className="btn-primary">Criar Rifa</button>
      </form>
    </div>
  );
}

export default CreateRaffle;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewRaffle() {
  const { id } = useParams();
  const [raffle, setRaffle] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    fetch(\`/api/raffles/\${id}\`)
      .then(res => res.json())
      .then(data => setRaffle(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBuy = async () => {
    if (selectedNumber === null) return alert('Selecione um número!');
    
    try {
      const response = await fetch(\`/api/raffles/\${id}/buy\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: selectedNumber })
      });
      
      if (response.ok) {
        alert(\`Número \${selectedNumber} comprado com sucesso!\`);
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao comprar:', error);
    }
  };

  if (!raffle) return <div className="loading">Carregando...</div>;

  const numbers = Array.from({ length: raffle.totalNumbers }, (_, i) => i + 1);

  return (
    <div className="view-raffle">
      <div className="raffle-header">
        <h1>{raffle.title}</h1>
        <span className="theme-badge">{raffle.theme}</span>
      </div>
      
      <div className="raffle-info">
        <p><strong>Prêmio:</strong> {raffle.prize}</p>
        <p><strong>Valor:</strong> R$ {raffle.price}</p>
        <p><strong>Descrição:</strong> {raffle.description}</p>
        <p><strong>Termina em:</strong> {new Date(raffle.endDate).toLocaleDateString()}</p>
      </div>

      <div className="numbers-grid">
        <h2>Escolha seu número</h2>
        <div className="grid">
          {numbers.map(num => (
            <button
              key={num}
              className={\`number-btn \${raffle.soldNumbers?.includes(num) ? 'sold' : ''} \${selectedNumber === num ? 'selected' : ''}\`}
              disabled={raffle.soldNumbers?.includes(num)}
              onClick={() => setSelectedNumber(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <button className="btn-buy" onClick={handleBuy}>
        Comprar Número {selectedNumber}
      </button>
    </div>
  );
}

export default ViewRaffle;

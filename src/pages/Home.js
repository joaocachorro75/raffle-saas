import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    fetch('/api/raffles')
      .then(res => res.json())
      .then(data => setRaffles(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home">
      <header className="hero">
        <h1>🐅 Raffle SaaS</h1>
        <p>Crie rifas profissionais com temas incríveis!</p>
        <Link to="/criar" className="btn-primary">Criar Rifa</Link>
      </header>

      <section className="raffles-grid">
        <h2>Rifas Ativas</h2>
        {raffles.length === 0 ? (
          <p>Nenhuma rifa ativa. Crie a primeira!</p>
        ) : (
          <div className="grid">
            {raffles.map(raffle => (
              <div key={raffle.id} className="raffle-card">
                <h3>{raffle.title}</h3>
                <p>Prêmio: {raffle.prize}</p>
                <p>Tema: {raffle.theme}</p>
                <p>Valor: R$ {raffle.price}</p>
                <Link to={`/rifa/${raffle.id}`} className="btn-secondary">
                  Ver Rifa
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
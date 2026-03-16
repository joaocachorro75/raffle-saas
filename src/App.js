import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateRaffle from './pages/CreateRaffle';
import ViewRaffle from './pages/ViewRaffle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar" element={<CreateRaffle />} />
          <Route path="/rifa/:id" element={<ViewRaffle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
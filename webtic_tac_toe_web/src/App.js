import React from 'react';
import './App.css';
import WebTicTacToe from './WebTicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span style={{ color: "#4CAF50", fontWeight: 500, fontSize: "1rem" }}>
              WebTicTacToe
            </span>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <WebTicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;
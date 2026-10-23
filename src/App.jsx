import React from 'react';
import ManutencaoIndApp from './ManutencaoIndApp';

export default function App() {
  return (
    <div style={{ padding: '16px', maxWidth: '480px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>
          🏭 Sistema de Manutenção Industrial
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>
          Registro de falhas em motores trifásicos
        </p>
      </header>
      <ManutencaoIndApp />
    </div>
  );
}

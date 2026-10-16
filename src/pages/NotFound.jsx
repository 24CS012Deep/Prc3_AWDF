import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1.5rem', maxWidth: '600px', margin: '2rem auto' }} className="glass-box">
      <div style={{ fontSize: '5rem', fontWeight: 900, color: '#ef4444', lineHeight: 1 }}>404</div>
      <h2 style={{ fontSize: '1.75rem', margin: '1rem 0 0.5rem' }}>Resource Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
        The route you are navigating to does not exist in this React single page application.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.6rem',
          borderRadius: '8px',
          background: 'var(--accent-blue)',
          color: '#fff',
          fontWeight: 600
        }}
      >
        ← Return Home
      </Link>
    </div>
  );
}

export default NotFound;

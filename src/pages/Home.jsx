import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page Component
 * Overview of the GitHub REST API explorer and asynchronous lifecycle architecture.
 */
function Home() {
  return (
    <div className="home-container">
      <div className="page-header-wrap">
        <h1 className="page-title">Deep Chauhan's Developer Portal</h1>
        <p className="page-desc">
          Roll No: 24CS012 • CSPIT / DEPSTAR — CHARUSAT
        </p>
      </div>

      <div className="glass-box" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          GitHub REST API Integration & Asynchronous Data Flow
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
          This application connects directly to the GitHub REST API using React's <code>useEffect</code> hook.
          It cleanly handles all three fundamental stages of asynchronous network requests:
          <strong> Loading</strong> (animated spinner), <strong>Error</strong> (user-friendly notification with retry capability),
          and <strong>Success</strong> (responsive repository grid featuring star counts, forks, and language tags).
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.8rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff',
              fontWeight: 700
            }}
          >
            Launch API Projects Explorer →
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.85rem 1.6rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontWeight: 600
            }}
          >
            Contact Developer
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-box">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>⏳ Loading State</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            A dedicated <code>&lt;Spinner /&gt;</code> component gives instant visual feedback to prevent blank screens during network latency.
          </p>
        </div>
        <div className="glass-box">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#f87171' }}>🛡️ Error Boundary & Retry</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Gracefully handles network timeouts, 404s, or rate limits via <code>&lt;ErrorMessage /&gt;</code> with an interactive retry callback.
          </p>
        </div>
        <div className="glass-box">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#34d399' }}>⚡ Instant Client Filter</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Filters dynamically fetched repositories in real-time as you type, calculating match statistics instantly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

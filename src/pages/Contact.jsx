import React, { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="contact-container">
      <div className="page-header-wrap">
        <h1 className="page-title">Connect with Deep Chauhan</h1>
        <p className="page-desc">Roll No: 24CS012 • CSPIT / DEPSTAR</p>
      </div>

      <div className="glass-box" style={{ maxWidth: '650px', margin: '0 auto' }}>
        {isSent ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <span style={{ fontSize: '3rem' }}>✉️</span>
            <h3 style={{ fontSize: '1.5rem', margin: '1rem 0 0.5rem' }}>Message Dispatched!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Thank you, <strong>{senderName}</strong>. Your message has been recorded.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSent(false);
                setMessage('');
                setSenderName('');
              }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--accent-blue)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Full Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
                placeholder="Deep Chauhan"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(31, 41, 55, 0.6)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="24cs012@charusat.edu.in"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(31, 41, 55, 0.6)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Message (Controlled Input)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Enter your message here..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(31, 41, 55, 0.6)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none',
                  resize: 'vertical'
                }}
              ></textarea>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>
                {message.length} characters
              </div>
            </div>

            <button
              type="submit"
              style={{
                padding: '0.85rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;

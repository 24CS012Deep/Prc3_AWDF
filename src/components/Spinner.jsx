import React from 'react';

/**
 * Spinner Component
 * Visual feedback indicator rendered during asynchronous data fetching.
 */
function Spinner({ message = 'Fetching GitHub Repositories...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner-circle"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default Spinner;

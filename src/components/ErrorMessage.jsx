import React from 'react';

/**
 * ErrorMessage Component
 * Presents network error state with a recovery retry trigger.
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">API Request Failed</h3>
      <p className="error-desc">
        {message || 'Unable to communicate with the GitHub REST API. Please check your network connection or verify the target username.'}
      </p>

      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          <span>🔄</span>
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

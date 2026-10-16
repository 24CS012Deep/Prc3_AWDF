import React, { useState, useEffect, useCallback } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import RepoList from '../components/RepoList';

/**
 * Projects Page Component
 * Connects to the GitHub REST API using useEffect and manages asynchronous
 * data, loading, error, and search filter states.
 */
function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('24CS012Deep');
  const [customUser, setCustomUser] = useState('');
  const [simulateError, setSimulateError] = useState(false);

  const fetchRepos = useCallback(() => {
    setLoading(true);
    setError(null);

    // Tests error boundary handling when fault simulation is active
    const apiUrl = simulateError
      ? 'https://api.github.com/non-existent-endpoint-test-failure/error'
      : `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`GitHub user "${username}" was not found (HTTP 404).`);
          } else if (res.status === 403) {
            throw new Error('GitHub API rate limit reached. Please wait a moment or try again.');
          }
          throw new Error(`Failed to fetch repositories (HTTP status: ${res.status} ${res.statusText})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Unexpected API response format received from GitHub.');
        }
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message || 'An unexpected network error occurred while fetching repositories.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username, simulateError]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (customUser.trim()) {
      setUsername(customUser.trim());
      setCustomUser('');
      setSimulateError(false);
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      <div className="page-header-wrap">
        <h1 className="page-title">GitHub Project Repositories</h1>
        <p className="page-desc">
          Live asynchronous integration consuming the public GitHub REST API with real-time state management.
        </p>
      </div>

      <div className="api-controls-panel">
        <div className="api-controls-row">
          <div className="search-box-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Filter repositories by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading || error !== null}
            />
          </div>

          <button
            type="button"
            className={`error-test-btn ${simulateError ? 'active' : ''}`}
            onClick={() => setSimulateError(!simulateError)}
            title="Simulate network failure to verify error state handling and recovery"
          >
            {simulateError ? '⚠️ Fault Simulation: ACTIVE' : '⚡ Test Network Error'}
          </button>
        </div>

        <div className="api-controls-row">
          <div className="username-selector-wrap">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Profile:
            </span>
            {['24CS012Deep', 'facebook', 'vercel', 'torvalds'].map((user) => (
              <button
                key={user}
                type="button"
                className={`username-btn ${username === user && !simulateError ? 'active' : ''}`}
                onClick={() => {
                  setUsername(user);
                  setSimulateError(false);
                }}
              >
                @{user}
              </button>
            ))}
          </div>

          <form onSubmit={handleUserSubmit} style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="Lookup any GitHub user..."
              value={customUser}
              onChange={(e) => setCustomUser(e.target.value)}
              style={{
                background: 'rgba(31, 41, 55, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.35rem 0.75rem',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="username-btn"
              style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#fff', borderColor: 'var(--accent-blue)' }}
            >
              Load
            </button>
          </form>
        </div>
      </div>

      {!loading && !error && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            padding: '0 0.5rem'
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredRepos.length}</strong> of <strong>{repos.length}</strong> public repositories for <strong>@{username}</strong>
          </span>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Clear filter ✕
            </button>
          )}
        </div>
      )}

      {loading && <Spinner message={`Fetching repositories for @${username}...`} />}

      {error && !loading && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            setSimulateError(false);
            fetchRepos();
          }}
        />
      )}

      {!loading && !error && <RepoList repos={filteredRepos} />}
    </div>
  );
}

export default Projects;

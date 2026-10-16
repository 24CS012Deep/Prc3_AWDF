import React from 'react';

/**
 * RepoList Component
 * Renders grid of GitHub repositories with metadata, statistics, and external links.
 */
function RepoList({ repos = [] }) {
  if (repos.length === 0) {
    return (
      <div className="empty-state-box glass-box">
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🔍</span>
        <h3>No repositories found matching your filter</h3>
        <p>Try searching for a different keyword or select another GitHub profile.</p>
      </div>
    );
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <div key={repo.id} className="repo-card">
          <div>
            <div className="repo-top">
              <h4 className="repo-name">{repo.name}</h4>
              <span className="repo-badge">{repo.private ? 'Private' : 'Public'}</span>
            </div>

            <p className="repo-desc">
              {repo.description || 'No description provided for this repository.'}
            </p>
          </div>

          <div>
            <div className="repo-meta-row">
              <div className="repo-stats">
                <span className="stat-item stat-star" title="Stars">
                  ⭐ {repo.stargazers_count ?? 0}
                </span>
                <span className="stat-item stat-fork" title="Forks">
                  🍴 {repo.forks_count ?? 0}
                </span>
                {repo.language && (
                  <span className="repo-lang-badge">{repo.language}</span>
                )}
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link-btn"
              >
                GitHub <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoList;

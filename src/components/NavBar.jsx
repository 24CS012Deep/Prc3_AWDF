import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * NavBar Component
 * Client-side navigation with active route highlights.
 */
function NavBar() {
  return (
    <nav className="navbar-container">
      <Link to="/" className="brand-link">
        Deep.dev
      </Link>

      <ul className="nav-menu">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active-route' : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active-route' : ''}`
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active-route' : ''}`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <span
        style={{
          fontSize: '0.8rem',
          color: 'var(--accent-cyan)',
          background: 'rgba(6, 182, 212, 0.1)',
          padding: '0.3rem 0.75rem',
          borderRadius: '9999px',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          fontWeight: 600
        }}
      >
        GitHub REST API
      </span>
    </nav>
  );
}

export default NavBar;

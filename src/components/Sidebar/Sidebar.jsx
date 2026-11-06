import { useState } from 'react';
import './Sidebar.css';

/**
 * Navigation sidebar with SpendWise logo and nav links.
 * Highlights the currently active page.
 * On mobile it collapses into a hamburger menu.
 */

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'transactions', label: 'Transactions', icon: '💸' },
  { id: 'budgets', label: 'Budgets', icon: '🎯' },
  { id: 'savings', label: 'Savings', icon: '🏦' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <span className="sidebar__logo-icon">💰</span>
          <span className="sidebar__logo-text">SpendWise</span>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar__link ${activePage === item.id ? 'sidebar__link--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              <span className="sidebar__link-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <p>SpendWise v1.0</p>
          <p>Student Budget Tracker</p>
        </div>
      </aside>
    </>
  );
}


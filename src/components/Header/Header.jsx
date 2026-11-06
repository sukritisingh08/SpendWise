import { getCurrentMonthYear } from '../../utils/formatDate';
import './Header.css';

/**
 * Dashboard header with welcome message,
 * current month, and "Add Transaction" button.
 */
export default function Header({ onAddTransaction }) {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">Welcome back! 👋</h1>
        <p className="header__subtitle">
          Here&apos;s your financial overview for{' '}
          <span className="header__month">{getCurrentMonthYear()}</span>
        </p>
      </div>
      <button className="header__add-btn" onClick={onAddTransaction}>
        <span className="header__add-icon">+</span>
        Add Transaction
      </button>
    </header>
  );
}


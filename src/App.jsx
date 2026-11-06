import { useState } from 'react';
import { TransactionProvider } from './context/TransactionContext';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import SavingsPage from './pages/SavingsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

/**
 * Root component of SpendWise.
 * - Wraps everything in TransactionProvider so all pages
 *   share the same transaction data.
 * - Manages which page is shown via activePage state.
 * - Renders the Sidebar + main content area.
 */
function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionsPage />;
      case 'budgets':
        return <BudgetsPage />;
      case 'savings':
        return <SavingsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <TransactionProvider>
      <div className="app-layout">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="main-content">{renderPage()}</main>
      </div>
    </TransactionProvider>
  );
}

export default App;

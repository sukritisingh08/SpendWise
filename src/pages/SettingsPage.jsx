import './Pages.css';

/**
 * Settings page placeholder.
 * Shows basic app info and a localStorage reset option.
 */
export default function SettingsPage() {
  const handleReset = () => {
    if (
      window.confirm(
        'This will delete all your data and reload the app with sample data. Continue?',
      )
    ) {
      localStorage.removeItem('spendwise_transactions');
      window.location.reload();
    }
  };

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Settings</h1>
          <p className="page__subtitle">Manage your SpendWise preferences</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3 className="settings-card__title">📱 About SpendWise</h3>
          <p className="settings-card__text">
            SpendWise is a student budget tracker that helps college students
            manage their income, expenses, monthly budgets, and savings goals.
          </p>
          <div className="settings-card__info">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
          <div className="settings-card__info">
            <span>Built with</span>
            <span>React + Vite</span>
          </div>
          <div className="settings-card__info">
            <span>Currency</span>
            <span>Indian Rupee (₹)</span>
          </div>
        </div>

        <div className="settings-card settings-card--danger">
          <h3 className="settings-card__title">🗑️ Reset Data</h3>
          <p className="settings-card__text">
            Clear all your transactions and reload the app with sample data.
            This action cannot be undone.
          </p>
          <button className="settings-card__reset-btn" onClick={handleReset}>
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}


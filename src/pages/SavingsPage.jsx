import { useTransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatCurrency';
import './Pages.css';

/**
 * Savings page – shows savings goals and progress.
 * Goals are hardcoded for now (will become editable later).
 */

const savingsGoals = [
  { id: '1', name: 'Emergency Fund', target: 25000, icon: '🛡️', color: '#10b981' },
  { id: '2', name: 'New Laptop', target: 50000, icon: '💻', color: '#3b82f6' },
  { id: '3', name: 'Trip to Goa', target: 15000, icon: '✈️', color: '#f59e0b' },
  { id: '4', name: 'Online Course', target: 5000, icon: '📚', color: '#8b5cf6' },
];

export default function SavingsPage() {
  const { summary } = useTransactionContext();

  const totalTarget = savingsGoals.reduce((sum, g) => sum + g.target, 0);
  const currentSavings = Math.max(summary.monthlySavings, 0);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Savings Goals</h1>
          <p className="page__subtitle">
            Track progress towards your financial goals
          </p>
        </div>
      </div>

      {/* Overall savings card */}
      <div className="savings-overview">
        <div className="savings-overview__card">
          <span className="savings-overview__icon">🏦</span>
          <div>
            <p className="savings-overview__label">Current Savings</p>
            <p className="savings-overview__amount">
              {formatCurrency(currentSavings)}
            </p>
          </div>
        </div>
        <div className="savings-overview__card">
          <span className="savings-overview__icon">🎯</span>
          <div>
            <p className="savings-overview__label">Total Goal</p>
            <p className="savings-overview__amount">
              {formatCurrency(totalTarget)}
            </p>
          </div>
        </div>
        <div className="savings-overview__card">
          <span className="savings-overview__icon">📊</span>
          <div>
            <p className="savings-overview__label">Overall Progress</p>
            <p className="savings-overview__amount">
              {totalTarget > 0
                ? `${Math.min((currentSavings / totalTarget) * 100, 100).toFixed(1)}%`
                : '0%'}
            </p>
          </div>
        </div>
      </div>

      {/* Individual goals */}
      <div className="savings-grid">
        {savingsGoals.map((goal) => {
          const saved = Math.min(
            (goal.target / totalTarget) * currentSavings,
            goal.target,
          );
          const pct = (saved / goal.target) * 100;
          return (
            <div key={goal.id} className="savings-card">
              <div className="savings-card__header">
                <span className="savings-card__icon">{goal.icon}</span>
                <span className="savings-card__name">{goal.name}</span>
                <span className="savings-card__pct">{pct.toFixed(0)}%</span>
              </div>
              <div className="savings-card__bar-track">
                <div
                  className="savings-card__bar-fill"
                  style={{ width: `${pct}%`, background: goal.color }}
                />
              </div>
              <div className="savings-card__footer">
                <span>{formatCurrency(saved)} saved</span>
                <span>{formatCurrency(goal.target)} goal</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


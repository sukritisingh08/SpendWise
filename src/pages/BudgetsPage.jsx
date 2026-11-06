import { useTransactionContext } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatCurrency';
import categories from '../data/categories';
import './Pages.css';

/**
 * Budgets page – shows budget limits vs actual spending per category.
 * Budget limits are hardcoded for now (will become editable later).
 */

const budgetLimits = {
  'Food & Dining': 5000,
  Transport: 2000,
  Shopping: 3000,
  Entertainment: 1500,
  Education: 3000,
  'Bills & Utilities': 1000,
  Health: 1000,
  Rent: 8000,
  Groceries: 2000,
  Other: 2000,
};

export default function BudgetsPage() {
  const { categoryTotals } = useTransactionContext();

  const budgetData = categories.map((cat) => {
    const spent =
      categoryTotals.find((c) => c.category === cat.name)?.amount || 0;
    const limit = budgetLimits[cat.name] || 2000;
    const pct = Math.min((spent / limit) * 100, 100);
    const remaining = limit - spent;
    return { ...cat, spent, limit, pct, remaining };
  });

  const totalBudget = Object.values(budgetLimits).reduce((a, b) => a + b, 0);
  const totalSpent = categoryTotals.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Budgets</h1>
          <p className="page__subtitle">
            Track your spending against monthly budgets
          </p>
        </div>
      </div>

      {/* Overall summary */}
      <div className="budget-summary">
        <div className="budget-summary__item">
          <span className="budget-summary__label">Total Budget</span>
          <span className="budget-summary__value">
            {formatCurrency(totalBudget)}
          </span>
        </div>
        <div className="budget-summary__item">
          <span className="budget-summary__label">Total Spent</span>
          <span className="budget-summary__value budget-summary__value--spent">
            {formatCurrency(totalSpent)}
          </span>
        </div>
        <div className="budget-summary__item">
          <span className="budget-summary__label">Remaining</span>
          <span
            className={`budget-summary__value ${totalBudget - totalSpent < 0 ? 'budget-summary__value--over' : 'budget-summary__value--ok'}`}
          >
            {formatCurrency(totalBudget - totalSpent)}
          </span>
        </div>
      </div>

      {/* Per-category budgets */}
      <div className="budget-grid">
        {budgetData.map((b) => (
          <div key={b.name} className="budget-card">
            <div className="budget-card__header">
              <span className="budget-card__icon">{b.icon}</span>
              <span className="budget-card__name">{b.name}</span>
            </div>
            <div className="budget-card__bar-track">
              <div
                className="budget-card__bar-fill"
                style={{
                  width: `${b.pct}%`,
                  background: b.remaining < 0 ? '#ef4444' : b.color,
                }}
              />
            </div>
            <div className="budget-card__footer">
              <span className="budget-card__spent">
                {formatCurrency(b.spent)} spent
              </span>
              <span
                className={`budget-card__remaining ${b.remaining < 0 ? 'budget-card__remaining--over' : ''}`}
              >
                {b.remaining >= 0
                  ? `${formatCurrency(b.remaining)} left`
                  : `${formatCurrency(Math.abs(b.remaining))} over`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


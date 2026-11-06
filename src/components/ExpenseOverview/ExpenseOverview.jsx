import { useTransactionContext } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatCurrency';
import categories from '../../data/categories';
import './ExpenseOverview.css';

/**
 * Shows three panels:
 *   1. Monthly Spending bar chart (pure CSS)
 *   2. Category-wise breakdown
 *   3. Budget progress bars
 */

/* Placeholder monthly budget caps per category */
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

export default function ExpenseOverview() {
  const { categoryTotals, summary } = useTransactionContext();

  // Safeguard against 0 or empty to prevent division by zero / NaN
  const maxCategoryAmount = Math.max(
    ...categoryTotals.map((c) => c.amount),
    1,
  );

  return (
    <div className="expense-overview">
      {/* 1. Monthly Spending Chart */}
      <div className="overview-card overview-card--chart">
        <h3 className="overview-card__title">Monthly Spending</h3>
        <div className="bar-chart">
          {categoryTotals.map((item) => {
            const catInfo = categories.find((c) => c.name === item.category);
            const pct = (item.amount / maxCategoryAmount) * 100;
            return (
              <div key={item.category} className="bar-chart__row">
                <span className="bar-chart__label">
                  {catInfo?.icon} {item.category}
                </span>
                <div className="bar-chart__track">
                  <div
                    className="bar-chart__fill"
                    style={{
                      width: `${pct}%`,
                      background: catInfo?.color || '#10b981',
                    }}
                  />
                </div>
                <span className="bar-chart__value">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            );
          })}
          {categoryTotals.length === 0 && (
            <p className="overview-card__empty">No expenses yet.</p>
          )}
        </div>
      </div>

      {/* 2. Category Breakdown */}
      <div className="overview-card overview-card--categories">
        <h3 className="overview-card__title">Category Breakdown</h3>
        <div className="category-list">
          {categoryTotals.map((item) => {
            const catInfo = categories.find((c) => c.name === item.category);
            const pct =
              summary.totalExpenses > 0
                ? ((item.amount / summary.totalExpenses) * 100).toFixed(1)
                : 0;
            return (
              <div key={item.category} className="category-item">
                <div className="category-item__left">
                  <span
                    className="category-item__dot"
                    style={{ background: catInfo?.color || '#10b981' }}
                  />
                  <span className="category-item__name">
                    {catInfo?.icon} {item.category}
                  </span>
                </div>
                <div className="category-item__right">
                  <span className="category-item__amount">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="category-item__pct">{pct}%</span>
                </div>
              </div>
            );
          })}
          {categoryTotals.length === 0 && (
            <p className="overview-card__empty">No expenses yet.</p>
          )}
        </div>
      </div>

      {/* 3. Budget Progress */}
      <div className="overview-card overview-card--budget">
        <h3 className="overview-card__title">Budget Progress</h3>
        <div className="budget-list">
          {categoryTotals.map((item) => {
            const limit = budgetLimits[item.category] || 2000;
            const pct = Math.min((item.amount / limit) * 100, 100);
            const over = item.amount > limit;
            const catInfo = categories.find((c) => c.name === item.category);
            return (
              <div key={item.category} className="budget-item">
                <div className="budget-item__header">
                  <span className="budget-item__name">
                    {catInfo?.icon} {item.category}
                  </span>
                  <span
                    className={`budget-item__status ${over ? 'budget-item__status--over' : ''}`}
                  >
                    {formatCurrency(item.amount)} / {formatCurrency(limit)}
                  </span>
                </div>
                <div className="budget-item__track">
                  <div
                    className={`budget-item__fill ${over ? 'budget-item__fill--over' : ''}`}
                    style={{
                      width: `${pct}%`,
                      background: over
                        ? '#ef4444'
                        : catInfo?.color || '#10b981',
                    }}
                  />
                </div>
              </div>
            );
          })}
          {categoryTotals.length === 0 && (
            <p className="overview-card__empty">No budget data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import { formatCurrency } from '../../utils/formatCurrency';
import { useTransactionContext } from '../../context/TransactionContext';
import './SummaryCards.css';

/**
 * Four summary cards: Balance, Income, Expenses, Savings.
 * Values are computed from the transaction list automatically.
 */

const cards = [
  {
    key: 'totalBalance',
    label: 'Total Balance',
    icon: '💰',
    colorClass: 'summary-card--balance',
  },
  {
    key: 'totalIncome',
    label: 'Total Income',
    icon: '📈',
    colorClass: 'summary-card--income',
  },
  {
    key: 'totalExpenses',
    label: 'Total Expenses',
    icon: '📉',
    colorClass: 'summary-card--expense',
  },
  {
    key: 'monthlySavings',
    label: 'Monthly Savings',
    icon: '🏦',
    colorClass: 'summary-card--savings',
  },
];

export default function SummaryCards() {
  const { summary } = useTransactionContext();

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.key} className={`summary-card ${card.colorClass}`}>
          <div className="summary-card__header">
            <span className="summary-card__icon">{card.icon}</span>
            <span className="summary-card__label">{card.label}</span>
          </div>
          <p className="summary-card__amount">
            {formatCurrency(summary[card.key])}
          </p>
        </div>
      ))}
    </div>
  );
}


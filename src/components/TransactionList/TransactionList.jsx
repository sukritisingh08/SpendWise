import { useState } from 'react';
import { useTransactionContext } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import categories from '../../data/categories';
import './TransactionList.css';

/**
 * Displays recent transactions in a clean table/list.
 * Each row shows: name, category, date, amount, type indicator.
 * Includes edit and delete buttons per row.
 */
export default function TransactionList({ onEdit, limit }) {
  const { transactions, deleteTransaction } = useTransactionContext();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const displayed = limit ? transactions.slice(0, limit) : transactions;

  const handleDelete = (id) => {
    if (confirmDelete === id) {
      deleteTransaction(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div className="tx-list-card">
      <div className="tx-list-card__header">
        <h3 className="tx-list-card__title">
          {limit ? 'Recent Transactions' : 'All Transactions'}
        </h3>
        <span className="tx-list-card__count">
          {displayed.length} {displayed.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {displayed.length === 0 ? (
        <p className="tx-list-card__empty">
          No transactions yet. Click &quot;Add Transaction&quot; to get started!
        </p>
      ) : (
        <div className="tx-table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((tx) => {
                const catInfo = categories.find((c) => c.name === tx.category);
                const isIncome = tx.type === 'income';
                return (
                  <tr key={tx.id} className="tx-row">
                    <td>
                      <div className="tx-row__name-cell">
                        <span className="tx-row__icon">
                          {isIncome ? '💚' : (catInfo?.icon || '📦')}
                        </span>
                        <div>
                          <p className="tx-row__name">{tx.name}</p>
                          {tx.note && (
                            <p className="tx-row__note">{tx.note}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tx-row__category">{tx.category}</span>
                    </td>
                    <td>
                      <span className="tx-row__date">
                        {formatDate(tx.date)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`tx-row__amount ${isIncome ? 'tx-row__amount--income' : 'tx-row__amount--expense'}`}
                      >
                        {isIncome ? '+' : '−'} {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td>
                      <div className="tx-row__actions">
                        <button
                          className="tx-row__btn tx-row__btn--edit"
                          onClick={() => onEdit(tx)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className={`tx-row__btn tx-row__btn--delete ${confirmDelete === tx.id ? 'tx-row__btn--confirm' : ''}`}
                          onClick={() => handleDelete(tx.id)}
                          title={
                            confirmDelete === tx.id
                              ? 'Click again to confirm'
                              : 'Delete'
                          }
                        >
                          {confirmDelete === tx.id ? '⚠️' : '🗑️'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


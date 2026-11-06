import { useState, useEffect } from 'react';
import { useTransactionContext } from '../../context/TransactionContext';
import { getTodayString } from '../../utils/formatDate';
import categories from '../../data/categories';
import './TransactionModal.css';

/**
 * Modal for adding or editing a transaction.
 * Shows validation errors inline.
 * Resets form cleanly when closed or when editing target changes.
 */

const emptyForm = {
  name: '',
  amount: '',
  type: 'expense',
  category: 'Food & Dining',
  date: getTodayString(),
  note: '',
};

function TransactionForm({ editingTx, onClose }) {
  const { addTransaction, editTransaction } = useTransactionContext();

  const [form, setForm] = useState(() => {
    if (editingTx) {
      return {
        name: editingTx.name,
        amount: String(editingTx.amount),
        type: editingTx.type,
        category: editingTx.category,
        date: editingTx.date,
        note: editingTx.note || '',
      };
    }
    return { ...emptyForm, date: getTodayString() };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Transaction name is required.';
    }
    const num = Number(form.amount);
    if (!form.amount || isNaN(num) || num <= 0) {
      errs.amount = 'Enter a valid amount greater than 0.';
    }
    if (!form.date) {
      errs.date = 'Date is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingTx) {
      editTransaction(editingTx.id, form);
    } else {
      addTransaction(form);
    }
    onClose();
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal__header">
        <h2 className="modal__title">
          {editingTx ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
      </div>

      <form className="modal__form" onSubmit={handleSubmit}>
        {/* Type toggle */}
        <div className="modal__type-toggle">
          <button
            type="button"
            className={`modal__type-btn ${form.type === 'expense' ? 'modal__type-btn--active-expense' : ''}`}
            onClick={() => setForm((p) => ({ ...p, type: 'expense' }))}
          >
            Expense
          </button>
          <button
            type="button"
            className={`modal__type-btn ${form.type === 'income' ? 'modal__type-btn--active-income' : ''}`}
            onClick={() => setForm((p) => ({ ...p, type: 'income' }))}
          >
            Income
          </button>
        </div>

        {/* Name */}
        <div className="modal__field">
          <label className="modal__label" htmlFor="tx-name">
            Transaction Name
          </label>
          <input
            id="tx-name"
            name="name"
            type="text"
            className={`modal__input ${errors.name ? 'modal__input--error' : ''}`}
            placeholder="e.g., Mess Bill, Freelance Payment"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="modal__error">{errors.name}</span>
          )}
        </div>

        {/* Amount */}
        <div className="modal__field">
          <label className="modal__label" htmlFor="tx-amount">
            Amount (₹)
          </label>
          <input
            id="tx-amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            className={`modal__input ${errors.amount ? 'modal__input--error' : ''}`}
            placeholder="e.g., 1500"
            value={form.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <span className="modal__error">{errors.amount}</span>
          )}
        </div>

        {/* Category */}
        <div className="modal__field">
          <label className="modal__label" htmlFor="tx-category">
            Category
          </label>
          <select
            id="tx-category"
            name="category"
            className="modal__input"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="modal__field">
          <label className="modal__label" htmlFor="tx-date">
            Date
          </label>
          <input
            id="tx-date"
            name="date"
            type="date"
            className={`modal__input ${errors.date ? 'modal__input--error' : ''}`}
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && (
            <span className="modal__error">{errors.date}</span>
          )}
        </div>

        {/* Note */}
        <div className="modal__field">
          <label className="modal__label" htmlFor="tx-note">
            Note (optional)
          </label>
          <input
            id="tx-note"
            name="note"
            type="text"
            className="modal__input"
            placeholder="Add a short note"
            value={form.note}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="modal__submit">
          {editingTx ? 'Save Changes' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}

export default function TransactionModal({ isOpen, onClose, editingTx }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <TransactionForm
        key={editingTx ? editingTx.id : 'new'}
        editingTx={editingTx}
        onClose={onClose}
      />
    </div>
  );
}

import { useState } from 'react';
import TransactionList from '../components/TransactionList/TransactionList';
import TransactionModal from '../components/TransactionModal/TransactionModal';
import './Pages.css';

/**
 * Full transactions page showing all transactions.
 */
export default function TransactionsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const openAddModal = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const openEditModal = (tx) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTx(null);
  };

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Transactions</h1>
          <p className="page__subtitle">
            View and manage all your transactions
          </p>
        </div>
        <button className="page__add-btn" onClick={openAddModal}>
          <span>+</span> Add Transaction
        </button>
      </div>
      <TransactionList onEdit={openEditModal} />
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        editingTx={editingTx}
      />
    </div>
  );
}


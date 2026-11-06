import { useState } from 'react';
import Header from '../components/Header/Header';
import SummaryCards from '../components/SummaryCards/SummaryCards';
import ExpenseOverview from '../components/ExpenseOverview/ExpenseOverview';
import TransactionList from '../components/TransactionList/TransactionList';
import TransactionModal from '../components/TransactionModal/TransactionModal';

/**
 * The main Dashboard page.
 * Brings together all the dashboard sections:
 *   - Header (with Add Transaction button)
 *   - Summary cards
 *   - Expense overview charts
 *   - Recent transactions (limited to 5 most recent)
 */
export default function Dashboard() {
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
    <>
      <Header onAddTransaction={openAddModal} />
      <SummaryCards />
      <ExpenseOverview />
      <TransactionList onEdit={openEditModal} limit={5} />
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        editingTx={editingTx}
      />
    </>
  );
}


import { useState, useEffect, useCallback, useMemo } from 'react';
import sampleTransactions from '../data/sampleTransactions';

const STORAGE_KEY = 'spendwise_transactions';

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Custom hook that manages all transaction state.
 * - Loads from localStorage on first render.
 * - Seeds sample data only if localStorage key does not exist yet.
 * - Preserves user changes even if all transactions are deleted.
 * - Saves to localStorage whenever transactions change.
 * - Provides add / edit / delete helpers.
 * - Computes summary stats (totalIncome, totalExpenses, etc.).
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // corrupted data → fall through to sample
    }
    return sampleTransactions;
  });

  // Persist to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = useCallback((transaction) => {
    const newTx = {
      ...transaction,
      id: generateId(),
      amount: Number(transaction.amount) || 0,
    };
    setTransactions((prev) => [newTx, ...prev]);
  }, []);

  // Edit an existing transaction by id
  const editTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              ...updates,
              amount:
                updates.amount !== undefined
                  ? Number(updates.amount) || 0
                  : tx.amount,
            }
          : tx,
      ),
    );
  }, []);

  // Delete a transaction by id
  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  // Computed summary values (guaranteed numeric arithmetic)
  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'income') totalIncome += amt;
      else totalExpenses += amt;
    });

    return {
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses,
      monthlySavings: totalIncome - totalExpenses,
    };
  }, [transactions]);

  // Category totals for charts
  const categoryTotals = useMemo(() => {
    const map = {};
    transactions
      .filter((tx) => tx.type === 'expense')
      .forEach((tx) => {
        const amt = Number(tx.amount) || 0;
        map[tx.category] = (map[tx.category] || 0) + amt;
      });
    return Object.entries(map)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    summary,
    categoryTotals,
  };
}

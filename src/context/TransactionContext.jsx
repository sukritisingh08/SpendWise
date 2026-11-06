/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useTransactions } from '../hooks/useTransactions';

/**
 * React Context that makes transaction data and actions
 * available to any component without "prop drilling".
 *
 * Wrap the app with <TransactionProvider> once,
 * then call useTransactionContext() in any child component.
 */
const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const value = useTransactions();
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const ctx = useContext(TransactionContext);
  if (!ctx) {
    throw new Error(
      'useTransactionContext must be used inside <TransactionProvider>',
    );
  }
  return ctx;
}

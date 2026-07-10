import { create } from 'zustand';
import { generateMockFinancialData } from '../../utils/mockDataGenerator';
import { Account, Budget, SavingsGoal, Transaction } from '../types/financial';

interface FinanceState {
  accounts: Account[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  transactions: Transaction[];
  initialized: boolean;
  initializeData: () => void;
  addTransaction: (transaction: any) => void;
  deleteTransaction: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  accounts: [],
  budgets: [],
  savingsGoals: [],
  transactions: [],
  initialized: false,

  initializeData: () => set((state) => {
    if (state.initialized) return {};
    return { ...generateMockFinancialData(), initialized: true };
  }),

  addTransaction: (newTx) => set((state) => {
    const fullTx = {
      ...newTx,
      id: `tx-${Date.now()}`,
      referenceNumber: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    };
    const updatedAccounts = state.accounts.map((acc) => 
      acc.id === fullTx.accountId ? { ...acc, balance: acc.balance + Number(fullTx.amount) } : acc
    );
    return {
      transactions: [fullTx, ...state.transactions],
      accounts: updatedAccounts,
    };
  }),

  deleteTransaction: (id) => set((state) => {
    const targetTx = state.transactions.find((t) => t.id === id);
    if (!targetTx) return {};
    const updatedAccounts = state.accounts.map((acc) => 
      acc.id === targetTx.accountId ? { ...acc, balance: acc.balance - targetTx.amount } : acc
    );
    return {
      transactions: state.transactions.filter((t) => t.id !== id),
      accounts: updatedAccounts,
    };
  }),
}));
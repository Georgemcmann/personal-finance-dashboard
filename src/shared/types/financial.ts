export type TransactionCategory = 'Income' | 'Housing' | 'Utilities' | 'Food & Dining' | 'Transportation' | 'Entertainment' | 'Investments' | 'Savings';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  accountId: string;
  accountName: string;
  date: string;
  merchant: string;
  category: TransactionCategory;
  amount: number;
  status: TransactionStatus;
  referenceNumber: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  mask: string;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  limit: number;
  spent: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}
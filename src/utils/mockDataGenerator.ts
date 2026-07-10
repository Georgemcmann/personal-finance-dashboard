import { Transaction, Account, Budget, SavingsGoal, TransactionCategory } from '../shared/types/financial';

const MERCHANTS: Record<TransactionCategory, string[]> = {
  Income: ['Stripe Payout', 'Google LLC Salary', 'Dividend Payment'],
  Housing: ['Mortgage Management LLC', 'Apartment Rent Inc'],
  Utilities: ['NextEra Energy', 'AT&T Mobility', 'Comcast Cable'],
  'Food & Dining': ['Whole Foods Market', 'Uber Eats', 'Blue Bottle Coffee', 'Sweetgreen'],
  Transportation: ['Uber/Lyft', 'Chevron Gas Station', 'Tesla Supercharger'],
  Entertainment: ['Netflix Inc.', 'Spotify Premium', 'Steam Games', 'AMC Theatres'],
  Investments: ['Vanguard Brokerage', 'Charles Schwab'],
  Savings: ['HYSA Vault Reserve'],
};

export function generateMockFinancialData() {
  const accounts: Account[] = [
    { id: 'acc-1', name: 'Apex Checking', type: 'checking', balance: 8450.25, currency: 'USD', mask: '•••• 8921' },
    { id: 'acc-2', name: 'High-Yield Savings', type: 'savings', balance: 54200.80, currency: 'USD', mask: '•••• 3341' },
    { id: 'acc-3', name: 'Amex Platinum Card', type: 'credit', balance: -1240.50, currency: 'USD', mask: '•••• 1005' },
    { id: 'acc-4', name: 'Vanguard Brokerage', type: 'investment', balance: 124500.00, currency: 'USD', mask: '•••• 5521' },
  ];

  const budgets: Budget[] = [
    { id: 'b-1', category: 'Housing', limit: 2500, spent: 2500 },
    { id: 'b-2', category: 'Food & Dining', limit: 800, spent: 540.20 },
    { id: 'b-3', category: 'Utilities', limit: 400, spent: 310.15 },
    { id: 'b-4', category: 'Transportation', limit: 300, spent: 120.40 },
    { id: 'b-5', category: 'Entertainment', limit: 400, spent: 420.00 },
  ];

  const savingsGoals: SavingsGoal[] = [
    { id: 'g-1', name: 'Emergency Fund', targetAmount: 30000, currentAmount: 25000, deadline: '2026-12-31' },
    { id: 'g-2', name: 'Europe Summer Trip', targetAmount: 8000, currentAmount: 4200, deadline: '2027-06-15' },
  ];

  const transactions: Transaction[] = [];
  const categories = Object.keys(MERCHANTS) as TransactionCategory[];

  for (let i = 0; i < 120; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchantsList = MERCHANTS[category];
    const merchant = merchantsList[Math.floor(Math.random() * merchantsList.length)];
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));
    
    let amount = Math.floor(Math.random() * 150) + 5;
    if (category === 'Income') {
      amount = Math.floor(Math.random() * 3000) + 1500;
    } else if (category === 'Housing') {
      amount = 2500;
    }

    const finalizedAmount = category === 'Income' ? amount : -amount;
    const account = accounts[Math.floor(Math.random() * accounts.length)];

    transactions.push({
      id: `tx-${1000 + i}`,
      accountId: account.id,
      accountName: account.name,
      date: date.toISOString(),
      merchant,
      category,
      amount: finalizedAmount,
      status: Math.random() > 0.05 ? 'completed' : 'pending',
      referenceNumber: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    });
  }

  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { accounts, budgets, savingsGoals, transactions };
}
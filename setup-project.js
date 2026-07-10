const fs = require('fs');
const path = require('path');

// Complete production project files map
const files = {
  // 1. BASE CONFIGURATIONS
  'package.json': JSON.stringify({
    name: "apex-finance-dashboard",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    dependencies: {
      "@hookform/resolvers": "^3.9.0",
      "@tanstack/react-query": "^5.56.2",
      "clsx": "^2.1.1",
      "date-fns": "^3.6.0",
      "framer-motion": "^11.5.4",
      "lucide-react": "^0.439.0",
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "react-hook-form": "^7.53.0",
      "react-router-dom": "^6.26.2",
      "recharts": "^2.12.7",
      "tailwind-merge": "^2.5.2",
      "zod": "^3.23.8",
      "zustand": "^4.5.5"
    },
    devDependencies: {
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
      "@vitejs/plugin-react": "^4.3.1",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.4.45",
      "tailwindcss": "^3.4.11",
      "typescript": "^5.5.3",
      "vite": "^5.4.2"
    }
  }, null, 2),

  'vite.config.ts': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
  `,

  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      useDefineForClassFields: true,
      lib: ["DOM", "DOM.Iterable", "ES2022"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noImplicitReturns: true,
      baseUrl: ".",
      paths: {
        "@/*": ["src/*"]
      }
    },
    include: ["src"]
  }, null, 2),

  'postcss.config.js': `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
  `,

  'tailwind.config.js': `
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(255, 255, 255)",
        foreground: "rgb(15, 23, 42)",
        card: "rgb(255, 255, 255)",
        'card-foreground': "rgb(15, 23, 42)",
        primary: "rgb(79, 70, 229)",
        'primary-foreground': "rgb(255, 255, 255)",
        secondary: "rgb(241, 245, 249)",
        'secondary-foreground': "rgb(15, 23, 42)",
        muted: "rgb(241, 245, 249)",
        'muted-foreground': "rgb(100, 116, 139)",
        border: "rgb(226, 232, 240)",
        destructive: "rgb(239, 68, 68)",
      },
      borderRadius: {
        xl: "12px",
      }
    },
  },
  plugins: [],
};
  `,

  'index.html': `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ApexFinance Executive Dashboard</title>
  </head>
  <body class="bg-slate-50">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
  `,

  // 2. STYLES & ENTRY
  'src/styles/index.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply antialiased text-foreground bg-background;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
  `,

  'src/main.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { useFinanceStore } from './shared/store/useFinanceStore';
import './styles/index.css';

useFinanceStore.getState().initializeData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  `,

  'src/App.tsx': `
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center font-medium text-muted-foreground">
          Loading operational nodes...
        </div>
      }>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}
  `,

  // 3. UTILS & TYPES
  'src/utils/cn.ts': `
import { clsx, type ClassValue } from 'clsx';
import { Blacklist, twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
  `,

  'src/shared/types/financial.ts': `
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
  `,

  'src/utils/mockDataGenerator.ts': `
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
      id: \`tx-\${1000 + i}\`,
      accountId: account.id,
      accountName: account.name,
      date: date.toISOString(),
      merchant,
      category,
      amount: finalizedAmount,
      status: Math.random() > 0.05 ? 'completed' : 'pending',
      referenceNumber: \`REF-\${Math.random().toString(36).substring(2, 10).toUpperCase()}\`,
    });
  }

  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { accounts, budgets, savingsGoals, transactions };
}
  `,

  // 4. GLOBAL STATE SYSTEM
  'src/shared/store/useFinanceStore.ts': `
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
      id: \`tx-\${Date.now()}\`,
      referenceNumber: \`REF-\${Math.random().toString(36).substring(2, 10).toUpperCase()}\`,
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
  `,

  // 5. APP SHELL LAYOUT
  'src/shared/components/layout/DashboardLayout.tsx': `
import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, CreditCard, PieChart, Settings, Bell, Plus } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { TransactionModal } from '../../../features/transactions/components/TransactionModal';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'Budgets & Goals', href: '/budgets', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMobileOpen(false); }, [location]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn("hidden md:flex flex-col border-r bg-white h-full z-20 relative", isSidebarOpen ? "w-64" : "w-20")}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <span className={cn("font-bold text-lg tracking-tight", !isSidebarOpen && "hidden")}>ApexFinance</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-100">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors",
                  isActive ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn(!isSidebarOpen && "hidden")}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Framework View wrapper */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Transaction</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">JD</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
  `,

  // 6. FEATURES CAPULES
  // A. DASHBOARD VIEW
  'src/features/dashboard/index.tsx': `
import { useFinanceStore } from '../../shared/store/useFinanceStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Wallet, ArrowUpRight, ArrowDownRight, Percent } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '../../utils/cn';

export function ExecutiveDashboard() {
  const { transactions, accounts, budgets } = useFinanceStore();

  const netWorth = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter((t) => t.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const chartData = useMemo(() => {
    return [
      { name: 'Wk 1', Income: totalIncome * 0.2, Expenses: totalExpenses * 0.25 },
      { name: 'Wk 2', Income: totalIncome * 0.3, Expenses: totalExpenses * 0.2 },
      { name: 'Wk 3', Income: totalIncome * 0.25, Expenses: totalExpenses * 0.35 },
      { name: 'Wk 4', Income: totalIncome * 0.25, Expenses: totalExpenses * 0.2 },
    ];
  }, [totalIncome, totalExpenses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Overview</h1>
        <p className="text-sm text-slate-500">Real-time portfolio positions telemetry node.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Net Worth', value: \`$\${netWorth.toLocaleString(undefined, {minimumFractionDigits: 2})}\`, icon: Wallet, desc: 'Aggregated accounts' },
          { name: 'Total Inflow', value: \`$\${totalIncome.toLocaleString()}\`, icon: ArrowUpRight, desc: 'Gross earnings' },
          { name: 'Total Outflow', value: \`$\${totalExpenses.toLocaleString()}\`, icon: ArrowDownRight, desc: 'Settled liabilities' },
          { name: 'Savings Rate', value: \`\${Math.max(0, savingsRate).toFixed(1)}%\`, icon: Percent, desc: 'Net cash preserved' },
        ].map((card, idx) => (
          <div key={idx} className="p-6 bg-white border rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{card.name}</span>
              <card.icon className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-base mb-4">Cash Flow Runways</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="Income" stroke="#10b981" fill="#e6f4ea" strokeWidth={2} />
                <Area type="monotone" dataKey="Expenses" stroke="#6366f1" fill="#eef2ff" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-semibold text-base">Top Budgets Utilization</h3>
          <div className="space-y-4">
            {budgets.slice(0, 4).map((b) => {
              const pct = (b.spent / b.limit) * 100;
              return (
                <div key={b.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{b.category}</span>
                    <span className="text-slate-500">\${b.spent} / \${b.limit}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full", pct > 100 ? "bg-red-500" : "bg-indigo-600")} style={{ width: \`\${Math.min(pct, 100)}%\` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
  `,

  // B. TRANSACTIONS VIEW WITH SUB-COMPONENTS
  'src/features/transactions/types/schema.ts': `
import { z } from 'zod';
export const transactionFormSchema = z.object({
  accountId: z.string().min(1, 'Account allocation selection is required'),
  merchant: z.string().min(2, 'Merchant title must span at least 2 characters'),
  category: z.enum(['Income', 'Housing', 'Utilities', 'Food & Dining', 'Transportation', 'Entertainment', 'Investments', 'Savings']),
  amount: z.coerce.number().refine(val => val !== 0, 'Transaction amount cannot evaluate to 0'),
  date: z.string().min(1, 'Event processing timestamp required'),
  status: z.enum(['completed', 'pending', 'failed']).default('completed'),
});
export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
  `,

  'src/features/transactions/components/TransactionModal.tsx': `
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { transactionFormSchema, TransactionFormValues } from '../types/schema';
import { useFinanceStore } from '../../../shared/store/useFinanceStore';

export function TransactionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { accounts, addTransaction } = useFinanceStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema)
  });

  if (!isOpen) return null;

  const onSubmit = (data: TransactionFormValues) => {
    const target = accounts.find(a => a.id === data.accountId);
    addTransaction({ ...data, accountName: target ? target.name : 'Unknown Account' });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white border rounded-xl shadow-lg max-w-md w-full relative z-10 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Log Ledger Entry</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select {...register('accountId')} class="w-full border p-2 rounded-lg text-sm bg-white">
            <option value="">Select Account</option>
            {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <input type="text" placeholder="Merchant" {...register('merchant')} class="w-full border p-2 rounded-lg text-sm" />
          <select {...register('category')} class="w-full border p-2 rounded-lg text-sm bg-white">
            <option value="Food & Dining">Food & Dining</option>
            <option value="Income">Income</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input type="number" step="0.01" placeholder="Amount (negative for expense)" {...register('amount')} class="w-full border p-2 rounded-lg text-sm" />
          <input type="date" {...register('date')} class="w-full border p-2 rounded-lg text-sm" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-indigo-700">Commit Position</button>
        </form>
      </div>
    </div>
  );
}
  `,

  'src/features/transactions/index.tsx': `
import { useState, useMemo } from 'react';
import { useFinanceStore } from '../../shared/store/useFinanceStore';
import { Trash2 } from 'lucide-react';

export function TransactionTable() {
  const { transactions, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter(t => t.merchant.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, search]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ledger Operations</h1>
        <p className="text-sm text-slate-500">Monitor and audit cash streams running across accounts.</p>
      </div>

      <input
        type="text"
        placeholder="Filter transactions by merchant..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-sm border p-2 rounded-lg text-sm bg-white"
      />

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase border-b">
              <th className="p-4">Merchant</th>
              <th className="p-4">Category</th>
              <th className="p-4">Account</th>
              <th className="p-4 text-right">Settled Value</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{tx.merchant}</td>
                <td className="p-4 text-slate-500">{tx.category}</td>
                <td className="p-4 text-slate-400">{tx.accountName}</td>
                <td className={\`p-4 text-right font-semibold \${tx.amount > 0 ? "text-emerald-600" : "text-slate-900"}\`}>
                  {tx.amount > 0 ? \`+\$\${tx.amount}\` : \`-\$\${Math.abs(tx.amount)}\`}
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => deleteTransaction(tx.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
  `,

  // C. BUDGETS VIEW
  'src/features/budgets/index.tsx': `
import { useFinanceStore } from '../../shared/store/useFinanceStore';
import { ShieldCheck, Target } from 'lucide-react';

export function BudgetsModule() {
  const { budgets, savingsGoals } = useFinanceStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budgets & Targets</h1>
        <p className="text-sm text-slate-500">Manage ongoing categorical safety thresholds and wealth caps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map(b => (
          <div key={b.id} className="p-5 bg-white border rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{b.category}</h4>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600" style={{ width: \`\${Math.min((b.spent/b.limit)*100, 100)}%\` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>\${b.spent} Spent</span>
              <span>\${b.limit} Cap</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savingsGoals.map(g => (
          <div key={g.id} className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg">{g.name}</h4>
              <Target className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">\${g.currentAmount}</span>
              <span className="text-xs text-slate-400">Targeting \${g.targetAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  `,

  // D. SETTINGS VIEW
  'src/features/settings/index.tsx': `
export function SettingsModule() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Configuration</h1>
        <p className="text-sm text-slate-500">Manage workspace variables, environment configurations, and security matrices.</p>
      </div>
      <div className="border-t pt-4 space-y-4 max-w-md">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Developer Principal Identity</label>
          <input type="text" readOnly value="John Doe" class="w-full border bg-slate-50 p-2 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Corporate Core Anchor Email</label>
          <input type="text" readOnly value="john.doe@apexfinance.io" class="w-full border bg-slate-50 p-2 rounded-lg text-sm" />
        </div>
      </div>
    </div>
  );
}
  `,

  // 7. CENTRAL ROUTING GRAPH INTERFACE
  'src/routes/index.tsx': `
import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../shared/components/layout/DashboardLayout';
import { ExecutiveDashboard } from '../features/dashboard';
import { TransactionTable } from '../features/transactions';
import { BudgetsModule } from '../features/budgets';
import { SettingsModule } from '../features/settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ExecutiveDashboard /> },
      { path: 'transactions', element: <TransactionTable /> },
      { path: 'budgets', element: <BudgetsModule /> },
      { path: 'settings', element: <SettingsModule /> }
    ],
  },
]);
  `
};

// Execution Unpacker Engine Loop block
console.log('⚡ Initializing production workspace assembly system...\n');

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(` ✅ Unpacked: ${filePath}`);
});

console.log('\n🎉 Corporate core frontend system generation complete!');
console.log('👉 Next actions: Run "npm install" followed by "npm run dev" to boot the server application environment.');
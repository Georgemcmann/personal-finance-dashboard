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
import { Navigate, useRoutes } from 'react-router-dom';
import CreateAssets from '../pages/assets/CreateAssets';
import CreateExpenseHeads from '../pages/expenses/CreateExpenseHeads';
import CreateTransaction from '../pages/transactions/CreateTransaction';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  BlankPage,
  Dashboard,
} from './elements';
// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
      ],
    },
    // Dashboard
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'assets',
          element: <CreateAssets />,
        },
        {
          path: 'expense',
          element: <CreateExpenseHeads />,
        },
        {
          path: 'transactions',
          element: <CreateTransaction />,
        },
      ],
    },

    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

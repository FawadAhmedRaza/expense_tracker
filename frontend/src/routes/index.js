import { Navigate, useRoutes } from 'react-router-dom';
import CreateProducts from '../pages/dashboard/ProductCreatePage';
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
  ProductCreatePage,
  ProductList,
  CategoryCreatePage
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
              <RegisterPage />
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
        // {
        //   path: 'dashboard',
        //   element: <Dashboard />,
        // },
        {
          path: 'product',
          children: [
            { element: <Navigate to="/dashboard/product/list" replace />, index: true },
            { path: 'create', element: <ProductCreatePage /> },
            { path: 'list', element: <ProductList /> },
          ],
        },
        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/category/create" replace />, index: true },
            { path: 'create', element: <CategoryCreatePage /> },
            // { path: 'list', element: <ProductList /> },
          ],
        },
        // {
        //   path: 'expense',
        //   element: <CreateExpenseHeads />,
        // },
        // {
        //   path: 'transactions',
        //   element: <CreateTransaction />,
        // },
      ],
    },

    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

import { RouteObject, Navigate } from 'react-router-dom';
import { AuthGuard, GuestGuard } from './guards';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './layouts/Layout';
import { ErrorPage } from './pages/ErrorPage';

const reutes: RouteObject[] = [
  {
    path: 'login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: 'register',
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        lazy: () => import('./pages/home'),
      },
      {
        path: '/dashboard',
        lazy: () => import('./pages/dashboard'),
      },
      {
        path: '/products',
        lazy: () => import('./pages/products'),
      },
      {
        path: '/orders',
        lazy: () => import('./pages/orders'),
      },
      {
        path: '/users',
        lazy: () => import('./pages/users'),
      },
      {
        path: '/sales',
        lazy: () => import('./pages/sales'),
      },
      {
        path: '*',
        element: <Navigate to="404" />
      }
     
    ],
  },
  {
    path: '404',
    element: <ErrorPage />
  }
];

export default reutes;

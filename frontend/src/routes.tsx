import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import { AuthGuard, GuestGuard } from './guards';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './layouts/Layout';

const reutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
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
        path: '/admin',
        lazy: () => import('./pages/admin'),
      },
      {
        path: '/orders',
        lazy: () => import('./pages/admin'),
      },
      {
        path: '/inventories',
        lazy: () => import('./pages/inventories'),
      },
    ],
  },
];

export default reutes;

import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SplashScreen from '../components/SplashScreen';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  if (!isAuthenticated && !isInitialized) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;

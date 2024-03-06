import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAccess from '../hooks/useAccess';
import useAuth from '../hooks/useAuth';
import SplashScreen from '@/components/SplashScreen';

// import GET_SHOULD_AUTH from 'src/graphql/querys/getShouldAuth';
// import { useQuery } from '@apollo/client';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  const { hasAccess, isAuthenticated } = useAccess();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
 
  if (!auth.isAuthenticated && !auth.isInitialized) {
    return <SplashScreen />;
  }

  if (!hasAccess(`Sec:${location.pathname}`)) {
    return <Navigate to="404" />
  }

  if (!isAuthenticated()) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    return <>{children}</>;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  

  return <>{children}</>;
};

export default AuthGuard;

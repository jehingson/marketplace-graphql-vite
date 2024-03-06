import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAccess from '../hooks/useAccess';
import SplashScreen from '../components/SplashScreen';
import useAuth from '../hooks/useAuth';
// import GET_SHOULD_AUTH from 'src/graphql/querys/getShouldAuth';
// import { useQuery } from '@apollo/client';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  const { hasAccess, isAuthenticated } = useAccess();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  // useQuery(GET_SHOULD_AUTH, {
  //   skip: !auth.isAuthenticated,
  //   variables: {
  //     userId: auth.user?.id || 0,
  //   },
  //   onCompleted: (data) => {
  //     if (data.shouldAuth?.should_auth) {
  //       auth.logout();
  //     }
  //   },
  // });

  if (!auth.isAuthenticated && !auth.isInitialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated()) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Navigate to="/login" />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  if (
    location.pathname === '/' &&
    !hasAccess('Sec:AnalisisEstacionesv2') &&
    !hasAccess('Sec:CentroControl')
  ) {
    if (hasAccess('Sec:Integraciones')) {
      return <Navigate to="/integrations" />;
    }
    if (hasAccess('Sec:AnalisisEstacionesv2')) {
      return <Navigate to="/analysis-station" />;
    }
    if (hasAccess('Sec:Reparto')) {
      return <Navigate to="/distribution-initialization" />;
    }
    if (hasAccess('Sec:Compuertas')) {
      return <Navigate to="/gates" />;
    }
    if (hasAccess('Sec:Sistemas')) {
      return <Navigate to="/systems" />;
    }
    if (hasAccess('Sec:Usuarios')) {
      return <Navigate to="/users-administration" />;
    }
    if (hasAccess('Sec:ReportesDGA')) {
      return <Navigate to="/organization/dga" />;
    }
    if (hasAccess('Sec:ExtraccionDatos')) {
      return <Navigate to="/data-extraction" />;
    }
    if (hasAccess('Sec:ConfiguracionEquipos')) {
      return <Navigate to="/device-configuration" />;
    }
    if (hasAccess('Sec:Anuncios')) {
      return <Navigate to="/announcements" />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;

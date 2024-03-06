import useAuth from './useAuth';

const useAccess = () => {
  const auth = useAuth();

  // const role = auth?.user ?? ''
  const isOrgCapta = true // role === 'admin'
  const isCaptaUser = true //role === 1;
  const isAdmin = true // role === 2;
  const isAccessAdminEndCapta = isCaptaUser || isAdmin;

  let access = auth && auth.user ? auth.user.access : null;

  if (!access) {
    access = {
      controlCenter: false,
      stations: false,
      virtualStations: false,
      integrations: false,
      dataAnalytics: false,
      dataAnalyticsV2: false,
      canals: false,
      gates: false,
      systems: false,
      distribution: false,
      users: false,
      dgaReports: false,
      dataExtraction: false,
      deviceConfiguration: false,
      allDevices: false,
      announcements: false,
      dataTables: false,
      faq: false,
      offLogin: false,
      permits: false,
      apiCapta: false,
      distributionMaipo: false,
      histories: false
    };
  }

  const isAuthenticated = () => {
    return auth.isAuthenticated;
  };

  const hasAccess = (permission: string) => {
    switch (permission) {
      case 'Sec:CentroControl':
        return access.controlCenter || isCaptaUser;
      case 'Sec:Usuarios':
        return isAccessAdminEndCapta;
      case 'Sec:Dispositivos':
        return isCaptaUser || access.allDevices || access.stations;
      case 'Sec:AnalisisEstaciones':
        return access.dataAnalytics || isCaptaUser;
      case 'Sec:AnalisisEstacionesv2':
        return isOrgCapta || access.dataAnalyticsV2 || access.dataAnalytics;
      case 'Sec:Sistemas':
        return access.systems || isCaptaUser;
      case 'Sec:Anuncios':
        return isCaptaUser;
      case 'Sec:Notificaciones':
        return isCaptaUser;
      case 'Sec:Organizacion':
        return isCaptaUser;
      case 'Sec:ReportesDGA':
        return (access.dgaReports && isAdmin) || isCaptaUser;
      case 'Sec:Integraciones':
        return access.integrations || isCaptaUser;
      case 'Sec:Canales':
        return isCaptaUser;
      case 'Sec:CentroAyuda':
        return access.faq || isCaptaUser;
      case 'Sec:ConfiguracionEquipos':
        return isCaptaUser;
      case 'Sec:PermisoAccesos':
        return (access.permits && isAdmin) || isCaptaUser;
      case 'Sec:API':
        return (access.apiCapta && isAdmin) || isCaptaUser;
      case 'Sec:DispositivosPublicos':
        return isCaptaUser;
      case 'Sec:Dashboard':
        return access.dataTables || isCaptaUser;
      case 'Sec:ExtraccionDatos':
        return access.dataExtraction || isCaptaUser;
      case 'Sec:EnvioComandos':
        return isCaptaUser;
      case 'Sec:Compuertas':
        return access.gates || isCaptaUser;
      case 'Sec:Reparto':
        return (access.distribution && isAdmin) || isCaptaUser;
      case 'Sec:CalculadoraMaipo': {
        return access.distributionMaipo || isCaptaUser;
      }
      case 'Sec:CalculadoraMaipoMenu': {
        return access.distributionMaipo;
      }
      case 'Sec:Soporte':
        return isCaptaUser;
      case 'Sec:StandardDesign':
        return isCaptaUser;
      case 'Sec:Histories':
        return isCaptaUser
      case 'Sec:MetricsViews':
        return isCaptaUser;
      case 'Sec:CalidadAgua':
        return isCaptaUser;
      default:
        return false;
    }
  };

  return {
    hasAccess,
    isAuthenticated,
  };
};

export default useAccess;

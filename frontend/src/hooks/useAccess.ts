import useAuth from './useAuth';

const useAccess = () => {
  
  const auth = useAuth();
  const { user } = auth
  const role = user?.role ?? null
  const isSales = role === 'sales'
  const isAdmin = role === 'admin';

  const isAuthenticated = () => {
    return auth.isAuthenticated;
  };

  const hasAccess = (permission: string) => {
    switch (permission) {
      case 'Sec:/':
        return true
      case 'Sec:/dashboard':
        return isAdmin;
      case 'Sec:/products':
        return isAuthenticated();
      case 'Sec:/sales':
        return isAdmin || isSales;
      case 'Sec:/orders':
        return isAuthenticated();
      case 'Sec:/categories':
        return isAdmin || isSales;
      case 'Sec:/users':
        return isAdmin;
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

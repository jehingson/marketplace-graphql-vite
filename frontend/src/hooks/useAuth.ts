import { useContext } from 'react';
import AuthContext from '../contexts/JWTcontext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

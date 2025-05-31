import { useContext } from 'react';
import AuthContext from './AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth have to be used within AuthContext');
  return context;
};

export default useAuth;

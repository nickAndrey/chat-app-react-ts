import { type FC } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../contexts/auth/useAuth';
import AppLayout from './AppLayout';
import PageLoader from './PageLoader';

const RouteGuard: FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader />;

  if (!isLoggedIn && !/\/login|\/sign-up/.test(location.pathname)) {
    return <Navigate to="/login" />;
  }

  return <AppLayout />;
};

export default RouteGuard;

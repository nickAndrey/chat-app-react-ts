import { Chat } from '@/views/chat';
import { Login } from '@/views/login';
import { type FC } from 'react';
import useAuth from './contexts/auth/useAuth';
import Layout from './layout/Layout';
import Loader from './layout/PageLoader';
import LoginLayout from './layout/LoginLayout';

const App: FC = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return isLoggedIn ? (
    <Layout>
      <Chat />
    </Layout>
  ) : (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
};

export default App;

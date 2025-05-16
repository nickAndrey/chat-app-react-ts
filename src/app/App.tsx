import { Chat } from '@/views/chat';
import { Login } from '@/views/login';
import { type FC } from 'react';
import useAuth from './contexts/auth/useAuth';
import Layout from './layout/Layout';
import LoginLayout from './layout/LoginLayout';

const App: FC = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <Layout>
        <Chat />
      </Layout>
    );
  }

  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
};

export default App;

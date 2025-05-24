import { type FC } from 'react';
import { RouterProvider } from 'react-router';
import { AuthContextProvider } from './contexts/auth/AuthContext';
import { routes } from './routes/routes';

const App: FC = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  );
};

export default App;

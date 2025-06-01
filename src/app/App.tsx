import { type FC } from 'react';
import { RouterProvider } from 'react-router';
import { AuthContextProvider } from './contexts/auth/AuthContext';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { routes } from './routes/routes';

const theme = createTheme({
  colorSchemes: {
    dark: false,
  },
  shape: {
    borderRadius: 16,
  },
});

const App: FC = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;

import { Container } from '@mui/material';
import { type FC } from 'react';
import { Outlet } from 'react-router';

const AppLayout: FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        background: 'linear-gradient(90deg,rgba(212, 212, 212, 0.77) 0%, rgba(77, 77, 92, 1) 100%)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Container>
    </Container>
  );
};

export default AppLayout;

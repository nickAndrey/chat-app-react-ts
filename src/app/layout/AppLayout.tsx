import { type FC } from 'react';
import { Outlet } from 'react-router';

const AppLayout: FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AppLayout;

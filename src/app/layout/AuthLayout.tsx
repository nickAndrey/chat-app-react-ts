import { type FC } from 'react';
import { Outlet } from 'react-router';

const AuthLayout: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

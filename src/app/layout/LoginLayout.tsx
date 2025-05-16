import { type FC, type ReactNode } from 'react';

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return <div className="flex justify-center items-center w-full h-screen">{children}</div>;
};

export default LoginLayout;

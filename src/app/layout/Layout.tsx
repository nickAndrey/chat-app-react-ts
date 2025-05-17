import { type FC, type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="w-screen h-screen flex items-center justify-center">{children}</div>;
};

export default Layout;

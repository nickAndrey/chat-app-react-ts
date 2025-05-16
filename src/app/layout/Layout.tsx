import { type FC, type ReactNode } from 'react';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

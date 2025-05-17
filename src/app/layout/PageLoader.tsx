import { Loader } from '@/shared/components/loader';
import { type FC } from 'react';

const PageLoader: FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader text="..." />
    </div>
  );
};

export default PageLoader;

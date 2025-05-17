import { type FC } from 'react';

type LoaderProps = {
  text: string;
};

const Loader: FC<LoaderProps> = ({ text }) => {
  return [...text].map((char, idx) => (
    <span
      key={`${char}_${idx}`}
      className="animate-bounce text-7xl font-bold text-gray-800"
      style={{
        animationDelay: `${idx * 0.1}s`,
        animationFillMode: 'both',
      }}
    >
      {char}
    </span>
  ));
};

export default Loader;

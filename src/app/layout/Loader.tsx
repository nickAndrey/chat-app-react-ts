import { type FC } from 'react';

function transformStringToListNodes(str: string) {
  return [...str].map((char, idx) => (
    <span
      key={`${char}_${idx}`}
      className="animate-bounce uppercase tracking-[4px] text-4xl font-bold "
      style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
    >
      {char}
    </span>
  ));
}

const Loader: FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {transformStringToListNodes('loading')}
    </div>
  );
};

export default Loader;

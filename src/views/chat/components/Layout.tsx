import { type FC } from 'react';
import { tv } from 'tailwind-variants';

const Layout: FC = () => {
  const layout = tv({
    slots: {
      base: `grid grid-rows-[1fr_auto] w-full h-full`,
      messagesContainer: `px-2 overflow-auto`,
    },
  });

  const { base, messagesContainer } = layout();

  return (
    <article className={base()}>
      <div className={messagesContainer()}>content</div>
    </article>
  );
};

export default Layout;

import { type FC } from 'react';
import { tv } from 'tailwind-variants';

type FooterProps = {
  input: {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (key: string) => void;
  };
  button: {
    onClick: () => void;
  };
};

const Footer: FC<FooterProps> = ({ input }) => {
  const footer = tv({
    slots: {
      baseStyles: `flex border-t-1 border-gray-300`,
      inputStyles: `px-4 py-2 w-full focus:inset-shadow-sm hover:inset-shadow-sm inset-shadow-gray-300 outline-hidden transition-all`,
      buttonStyles: `p-4 hover:inset-shadow-sm inset-shadow-gray-300 hover:cursor-pointer transition-all`,
    },
  });

  const { baseStyles, inputStyles, buttonStyles } = footer();

  return (
    <footer className={baseStyles()}>
      <input
        type="text"
        placeholder="Start typing ..."
        className={inputStyles()}
        value={input.value}
        onChange={(e) => input.onChange(e.target.value)}
        onKeyDown={(e) => input.onKeyDown(e.key)}
      />
      <button type="button" className={buttonStyles()}>
        Send
      </button>
    </footer>
  );
};

export default Footer;

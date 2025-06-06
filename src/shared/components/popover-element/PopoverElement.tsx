import Popover, { type PopoverOrigin } from '@mui/material/Popover';
import { useState, type FC, type MouseEvent, type ReactNode } from 'react';

type PopoverElementProps = {
  children: ReactNode;
  id?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  triggerRenderer: ({
    handleClick,
  }: {
    handleClick: (e: MouseEvent<HTMLElement>) => void;
  }) => ReactNode;
};

const PopoverElement: FC<PopoverElementProps> = ({
  children,
  id,
  anchorOrigin,
  transformOrigin,
  triggerRenderer,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const newId = open ? id : undefined;

  return (
    <>
      {triggerRenderer({ handleClick })}

      <Popover
        id={newId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          ...anchorOrigin,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
          ...transformOrigin,
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default PopoverElement;

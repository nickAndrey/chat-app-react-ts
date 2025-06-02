import Popover from '@mui/material/Popover';
import { useState, type FC, type MouseEvent, type ReactNode } from 'react';

type PopoverElementProps = {
  children: ReactNode;
  id?: string;
  triggerRenderer: ({
    handleClick,
  }: {
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  }) => ReactNode;
};

const PopoverElement: FC<PopoverElementProps> = ({ children, id, triggerRenderer }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
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
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default PopoverElement;

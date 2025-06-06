import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { IconButton, Stack } from '@mui/material';
import { type FC } from 'react';

type MessageActionsProps = {
  handleEdit: () => void;
  handleDelete: () => void;
};

const MessageActions: FC<MessageActionsProps> = ({ handleEdit, handleDelete }) => {
  const actions = [
    {
      label: 'edit',
      icon: <ModeIcon sx={{ width: 14, height: 14 }} />,
      action: handleEdit,
    },
    {
      label: 'delete',
      icon: <DeleteIcon sx={{ width: 14, height: 14 }} />,
      action: handleDelete,
    },
  ];

  return (
    <Stack direction="row" spacing={1} px={2} py={1}>
      {actions.map((item) => (
        <IconButton key={item.label} size="small" onClick={item.action}>
          {item.icon}
        </IconButton>
      ))}
    </Stack>
  );
};

export default MessageActions;

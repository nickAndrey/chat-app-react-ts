import type { Message } from '@/shared/types/message';
import { Box, Typography } from '@mui/material';
import { type FC } from 'react';
import { MessageCloud } from '../message-cloud';

type MessagesProps = { messages: Message[]; userId: string };

const Messages: FC<MessagesProps> = ({ messages, userId }) => {
  if (messages.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
        <Typography variant="caption">Start conversation</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflow: 'auto',
        px: 2,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {messages.map((msg) => (
        <MessageCloud
          key={msg.id}
          message={msg.content}
          isCurrentUserSender={msg.senderId === userId}
        />
      ))}
    </Box>
  );
};

export default Messages;

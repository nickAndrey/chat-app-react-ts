import type { Message } from '@/shared/types/message';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button } from '@mui/material';
import { type FC } from 'react';
import { MessageCloud } from '../message-cloud';
import useAutoScroll from './hooks/useAutoScroll';

type MessagesProps = { messages: Message[]; userId: string };

const Messages: FC<MessagesProps> = ({ messages, userId }) => {
  const { ref, hasNewMessages, scrollToBottom } = useAutoScroll(messages);

  return (
    <Box
      ref={ref}
      sx={{
        overflowY: 'auto',
        px: 2,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        position: 'relative',
      }}
    >
      {messages.map((msg) => (
        <MessageCloud
          key={msg.id}
          message={msg.content}
          isCurrentUserSender={msg.senderId === userId}
        />
      ))}

      {hasNewMessages && (
        <Button
          onClick={scrollToBottom}
          size="small"
          color="inherit"
          variant="outlined"
          sx={{
            position: 'sticky',
            bottom: 16,
            alignSelf: 'flex-end',
            zIndex: 1,
            border: '1px dashed',
            borderRadius: '50%',
            p: 1,
            bgcolor: 'white',
            minWidth: 15,
          }}
        >
          <ArrowDownwardIcon />
        </Button>
      )}
    </Box>
  );
};

export default Messages;

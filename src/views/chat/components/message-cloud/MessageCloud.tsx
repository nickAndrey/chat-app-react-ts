import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { type FC } from 'react';

type MessageCloudProps = {
  message: string;
  isCurrentUserSender: boolean;
};

const MessageCloud: FC<MessageCloudProps> = ({ message, isCurrentUserSender }) => {
  return (
    <Box
      sx={{
        px: 1,
        py: 0.7,
        bgcolor: grey['400'],
        maxWidth: '500px',
        width: 'max-content',
        borderRadius: '16px',
        ml: isCurrentUserSender ? 'auto' : '',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
      }}
    >
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
};

export default MessageCloud;

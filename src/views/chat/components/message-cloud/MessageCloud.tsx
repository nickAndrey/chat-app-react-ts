import { Box, Typography, type SxProps } from '@mui/material';
import { blue, blueGrey, grey } from '@mui/material/colors';
import { type FC, type MouseEvent } from 'react';

type MessageCloudProps = {
  message: string;
  updatedAt?: string;
  isCurrentUserSender: boolean;
  sx?: SxProps;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

const MessageCloud: FC<MessageCloudProps> = ({
  message,
  updatedAt,
  isCurrentUserSender,
  sx,
  onClick,
}) => {
  const arrowDirection = isCurrentUserSender ? 'right' : 'left';
  const bgcolor = isCurrentUserSender ? blue['100'] : blueGrey['600'];

  const date = new Date(updatedAt || '');
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  });

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        gap: 2,
        px: 1,
        py: 0.7,
        bgcolor,
        color: isCurrentUserSender ? grey['900'] : '#ffffff',
        maxWidth: '60%',
        width: 'max-content',
        borderRadius: '16px',
        ml: isCurrentUserSender ? 'auto' : '',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        whiteSpace: 'pre-wrap',
        position: 'relative',
        zIndex: 1,
        ...sx,
      }}
    >
      <Typography variant="body2">{message}</Typography>
      <Typography variant="caption">{time}</Typography>

      <Box
        sx={{
          width: 10,
          position: 'absolute',
          top: 8,
          bottom: 0,
          [arrowDirection]: 2,
          borderBottomRightRadius: isCurrentUserSender ? 0 : 30,
          borderBottomLeftRadius: isCurrentUserSender ? 30 : 0,
          bgcolor,
          zIndex: -1,
        }}
      />
    </Box>
  );
};

export default MessageCloud;

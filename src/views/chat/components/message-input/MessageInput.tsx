import { TextField } from '@mui/material';
import { useEffect, useRef, type ChangeEvent, type FC, type KeyboardEvent } from 'react';

type MessageInputProps = {
  currentMessage: string;
  setCurrentMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
};

const MessageInput: FC<MessageInputProps> = ({
  currentMessage,
  setCurrentMessage,
  sendMessage,
}) => {
  const inputRef = useRef<HTMLDivElement | null>(null);

  // Auto-resize height when message changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'; // reset before setting
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [currentMessage]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return; // Allow new line.
      }

      e.preventDefault();

      if (currentMessage.trim() !== '') {
        sendMessage(currentMessage);
        setCurrentMessage('');
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <TextField
      multiline
      fullWidth
      aria-label="chat message input"
      ref={inputRef}
      maxRows={5}
      placeholder="Write a message..."
      value={currentMessage}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default MessageInput;

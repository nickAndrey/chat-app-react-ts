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
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize height when message changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'; // reset before setting
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [currentMessage]);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
    <textarea
      ref={inputRef}
      className="border border-gray-400 rounded-md px-4 py-2 w-full resize-none overflow-hidden min-h-[40px]"
      placeholder="Type message"
      rows={1}
      value={currentMessage}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default MessageInput;

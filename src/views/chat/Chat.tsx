import { useChat } from '@/shared/hooks/useChat';
import { type FC } from 'react';
import { ChatArea } from './components/chat-area';

const Chat: FC = () => {
  const { messages, sendMessage } = useChat();

  return (
    <div className="w-full max-w-[800px] max-h-[75vh] h-full bg-gray-100 shadow-md shadow-gray-400 rounded-md p-4">
      <ChatArea messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;

import useAuth from '@/app/contexts/auth/useAuth';
import { useState, type FC } from 'react';
import { useLocation } from 'react-router';
import { MessageCloud } from './components/message-cloud';
import { MessageInput } from './components/message-input';
import useGetMessages from './hooks/useGetMessages';
import useSendMessages from './hooks/useSendMessages';

const ChatRoom: FC = () => {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const roomID = parts[parts.length - 1];

  const [currentMessage, setCurrentMessage] = useState('');

  const { user } = useAuth();
  const { messages } = useGetMessages(roomID);
  const { sendMessage } = useSendMessages(roomID);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-4 px-2 overflow-auto">
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${message.senderId === user?.id ? 'self-end' : 'self-start'}`}
          >
            <MessageCloud message={message.content} senderId={message.senderId} />
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-gray-100">
        <MessageInput
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatRoom;

import { type FC } from 'react';
import { ChatRoom } from './components/chat-room';

const Chat: FC = () => {
  return (
    <div className="w-full max-w-[800px] max-h-[75vh] h-full bg-gray-100 shadow-md shadow-gray-400 rounded-md p-4">
      <ChatRoom messages={[]} sendMessage={() => {}} />
    </div>
  );
};

export default Chat;

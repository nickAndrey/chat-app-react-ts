import { useChat } from '@/shared/hooks/useChat';
import { useState, type FC } from 'react';

const Chat: FC = () => {
  const { messages, sendMessage } = useChat();

  const [currentMessage, setCurrentMessage] = useState('');

  return (
    <div className="w-full max-w-[800px] max-h-[75vh] h-full bg-gray-100 shadow-md shadow-gray-400 rounded-md p-4 grid grid-rows-[1fr_auto] gap-4">
      <div className="overflow-auto flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div
            key={`${msg}_${idx}`}
            className={`p-4 bg-gray-400 max-w-[250px] rounded-4xl ${/you/i.test(msg) ? 'ml-auto' : ''}`}
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="">
        <input
          className="border border-gray-400 rounded-md px-4 py-2 w-full"
          placeholder="Type message"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && currentMessage !== '') {
              sendMessage(currentMessage);
              setCurrentMessage('');
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chat;

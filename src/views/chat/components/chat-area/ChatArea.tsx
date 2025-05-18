import type { ChatMessageDTO } from '@/shared/types/chatMessageDto';
import { useState, type FC } from 'react';
import { MessageCloud } from '../message-cloud';
import { MessageInput } from '../message-input';

type ChatAreaProps = {
  messages: ChatMessageDTO[];
  sendMessage: (msg: string) => void;
};

const ChatArea: FC<ChatAreaProps> = ({ messages, sendMessage }) => {
  const [currentMessage, setCurrentMessage] = useState('');

  return (
    <div className="grid grid-rows-[1fr_auto] gap-4 h-full">
      <div className="overflow-auto flex flex-col gap-4">
        {messages.map((message) => (
          <MessageCloud key={message.id} message={message.content} senderId={message.senderId} />
        ))}
      </div>

      <MessageInput
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatArea;

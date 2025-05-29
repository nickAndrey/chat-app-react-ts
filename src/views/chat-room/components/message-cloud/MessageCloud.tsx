import { type FC } from 'react';

type MessageCloudProps = {
  message: string;
  senderId: string;
};

const MessageCloud: FC<MessageCloudProps> = ({ message, senderId }) => {
  return (
    <div
      className={`px-4 py-2 bg-gray-600 text-white max-w-[250px] rounded-4xl whitespace-pre-wrap ${/you/i.test(senderId) ? 'ml-auto' : 'mr-auto'}`}
    >
      {message}
    </div>
  );
};

export default MessageCloud;

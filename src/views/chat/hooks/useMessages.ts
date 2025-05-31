import { socket } from '@/app/services/socket';
import { messagesCreate } from '@/shared/services/messages-create';
import { roomsGetAllMessagesById } from '@/shared/services/rooms-get-all-messages-by-id';
import type { Message } from '@/shared/types/message';
import type { PublicUser } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';

type Args = {
  user: PublicUser;
  activeRoomId: string;
};

const useMessages = ({ user, activeRoomId }: Args) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Get initial messages for the room
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMessages() {
      try {
        const response = await roomsGetAllMessagesById({
          roomId: activeRoomId,
          options: { signal: controller.signal },
        });
        setMessages(response);
      } catch (error) {
        const { message } = handleError(error);
        console.error(message);
      }
    }

    if (activeRoomId) {
      fetchMessages();
    }

    return () => {
      controller.abort();
    };
  }, [activeRoomId]);

  // Connect to the socket to receive messages in real time
  useEffect(() => {
    function handleNewMessage(msg: Message) {
      setMessages((prev) => [...prev, msg]);
    }

    if (activeRoomId) {
      socket.emit('joinRoom', activeRoomId);
      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [activeRoomId]);

  const sendMessage = async (msg: string) => {
    try {
      await messagesCreate({
        roomId: activeRoomId,
        content: msg,
        senderId: user.id,
      });
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  return {
    messages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
  };
};

export default useMessages;

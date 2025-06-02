import { socket } from '@/app/services/socket';
import { createMessage } from '@/shared/services/create-message';
import { getMessages } from '@/shared/services/get-messages';

import type { Message } from '@/shared/types/message';
import type { PublicUser } from '@/shared/types/user';
import { createError } from '@/shared/utils/create-error';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';

type Args = {
  user: PublicUser;
  activeRoomId?: string;
};

const useMessages = ({ user, activeRoomId }: Args) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Get initial messages for the room
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMessages(roomId: string) {
      try {
        const response = await getMessages({
          roomId,
          userId: user.id,
          options: { signal: controller.signal },
        });
        setMessages(response);
      } catch (error) {
        const { message } = handleError(error);
        console.error(message);
      }
    }

    if (activeRoomId) {
      fetchMessages(activeRoomId);
    }

    return () => {
      controller.abort();
    };
  }, [activeRoomId, user.id]);

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
      if (!activeRoomId) throw createError('Field missed: activeRoomId');

      await createMessage({
        roomId: activeRoomId,
        content: msg,
        senderId: user.id,
      });
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  const resetMessagesState = () => {
    setMessages([]);
  };

  return {
    messages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    resetMessagesState,
  };
};

export default useMessages;

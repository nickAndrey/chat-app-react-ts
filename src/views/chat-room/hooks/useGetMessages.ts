import { socket } from '@/app/services/socket';
import { roomsGetAllMessagesById } from '@/shared/services/rooms-get-all-messages-by-id';
import type { Message } from '@/shared/types/message';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';

const useGetMessages = (roomID: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMessages() {
      try {
        const response = await roomsGetAllMessagesById({
          roomID,
          options: { signal: controller.signal },
        });
        setMessages(response);
      } catch (error) {
        const { message } = handleError(error);
        console.error(message);
      }
    }

    fetchMessages();

    return () => {
      controller.abort();
    };
  }, [roomID]);

  useEffect(() => {
    function handleNewMessage(msg: Message) {
      setMessages((prev) => [...prev, msg]);
    }

    socket.emit('joinRoom', roomID);
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [roomID]);

  return {
    messages,
  };
};

export default useGetMessages;

import { socket } from '@/app/services/socket';
import { createMessage } from '@/shared/services/create-message';
import { deleteMessage } from '@/shared/services/delete-message';
import { getMessages } from '@/shared/services/get-messages';
import { updateMessage } from '@/shared/services/update-message';

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

  // Clear messages state when user left rooms and there is no active room.
  useEffect(() => {
    if (!activeRoomId) {
      setMessages([]);
      setCurrentMessage('');
    }
  }, [activeRoomId]);

  const handleCreateMessage = async (params: {
    roomId?: string;
    senderId: string;
    content: string;
  }) => {
    try {
      if (!params.roomId) throw createError('Field missed: "roomId"');

      await createMessage({
        roomId: params.roomId,
        senderId: params.senderId,
        content: params.content,
      });
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  const handleDeleteMessage = async (params: {
    roomId: string;
    messageId: string;
    memberId: string;
  }) => {
    try {
      await deleteMessage({
        roomId: params.roomId,
        messageId: params.messageId,
        memberId: params.memberId,
      });
      setMessages((prev) => prev.filter((msg) => msg.id !== params.messageId));
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  const handleUpdateMessage = async (params: {
    roomId: string;
    messageId: string;
    content: string;
  }) => {
    try {
      await updateMessage({
        roomId: params.roomId,
        messageId: params.messageId,
        content: params.content,
      });

      setMessages((prev) => prev.filter((msg) => msg.id !== params.messageId));
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  return {
    messages,
    currentMessage,
    setCurrentMessage,
    handleCreateMessage,
    handleDeleteMessage,
    handleUpdateMessage,
  };
};

export default useMessages;

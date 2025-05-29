import useAuth from '@/app/contexts/auth/useAuth';
import { messagesCreate } from '@/shared/services/messages-create';
import { handleError } from '@/shared/utils/handle-error';

const useSendMessages = (roomID: string) => {
  const { user } = useAuth();

  const sendMessage = async (msg: string) => {
    try {
      await messagesCreate({
        roomId: roomID,
        content: msg,
        senderId: user?.id || '',
      });
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  return {
    sendMessage,
  };
};

export default useSendMessages;

import type { Message } from '../types/message';
import { apiClient } from '../utils/api-client';

type Args = {
  roomId: string;
  senderId: string;
  content: string;
  options?: { signal: AbortSignal };
};

export function createMessage({ roomId, senderId, content, options }: Args) {
  const bodyDTO: Pick<Message, 'roomId' | 'senderId' | 'content'> = {
    roomId,
    senderId,
    content,
  };

  return apiClient<Message>(`/rooms/${roomId}/messages`, {
    method: 'POST',
    body: bodyDTO,
    signal: options?.signal,
  });
}

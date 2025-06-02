import type { Message } from '../types/message';
import { apiClient } from '../utils/api-client';

type Args = {
  roomId: string;
  userId: string;
  options?: { signal: AbortSignal };
};

export function getMessages({ roomId, userId, options }: Args) {
  return apiClient<Message[]>(`/rooms/${roomId}/messages?userId=${userId}`, {
    method: 'GET',
    signal: options?.signal,
  });
}

import { apiClient } from '../utils/api-client';

type Args = {
  roomId: string;
  messageId: string;
  content: string;
  options?: { signal: AbortSignal };
};

export function updateMessage({ roomId, messageId, content, options }: Args) {
  return apiClient<null>(`/rooms/${roomId}/messages/${messageId}`, {
    method: 'PUT',
    body: { content },
    signal: options?.signal,
  });
}

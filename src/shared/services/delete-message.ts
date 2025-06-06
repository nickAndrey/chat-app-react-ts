import { apiClient } from '../utils/api-client';

type Args = {
  roomId: string;
  messageId: string;
  memberId: string;
  options?: { signal: AbortSignal };
};

export function deleteMessage({ roomId, messageId, memberId, options }: Args) {
  return apiClient<null>(`/rooms/${roomId}/messages/${messageId}/remove`, {
    method: 'POST',
    body: { memberId },
    signal: options?.signal,
  });
}

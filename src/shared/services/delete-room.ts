import { apiClient } from '../utils/api-client';

type Args = {
  roomId: string;
  memberId: string;
  options?: { signal: AbortSignal };
};

export function deleteRoom({ roomId, memberId, options }: Args) {
  return apiClient<null>(`/rooms/${roomId}/soft-delete`, {
    method: 'POST',
    body: { memberId },
    signal: options?.signal,
  });
}

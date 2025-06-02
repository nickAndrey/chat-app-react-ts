import type { Room } from '../types/room';
import { apiClient } from '../utils/api-client';

type Args = {
  userId: string;
  options?: { signal: AbortSignal };
};

export function getRooms({ userId, options }: Args) {
  return apiClient<Room[]>(`/users/${userId}/rooms`, {
    method: 'GET',
    signal: options?.signal,
  });
}

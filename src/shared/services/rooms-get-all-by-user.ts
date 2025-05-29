import type { Room } from '../types/room';
import { createError } from '../utils/create-error';

type Args = {
  userID: string;
  options?: {
    signal: AbortSignal;
  };
};

export async function roomsGetAllByUser({ userID, options }: Args) {
  const url = `${import.meta.env.VITE_API_URL}/users/${userID}/rooms`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    signal: options?.signal,
  });

  if (response.status === 401) throw createError('token has been expired');
  if (response.status === 500) throw createError('Internal server error', { cause: response });

  const { data } = await response.json();
  return data as Room[];
}

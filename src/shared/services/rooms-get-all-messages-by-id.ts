import type { Message } from '../types/message';
import { createError } from '../utils/create-error';

type Args = {
  roomID: string;
  options?: { signal: AbortSignal };
};

export async function roomsGetAllMessagesById({ roomID, options }: Args) {
  const url = `${import.meta.env.VITE_API_URL}/rooms/${roomID}/messages`;

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
  return data as Message[];
}

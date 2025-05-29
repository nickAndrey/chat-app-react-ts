import type { PublicUser } from '../types/user';
import { createError } from '../utils/create-error';

const url = `${import.meta.env.VITE_API_URL}/users/search`;

type Args = {
  searchValue: string;
  options?: {
    signal: AbortSignal;
  };
};

export async function usersSearch({ searchValue, options }: Args) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ search: searchValue }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    signal: options?.signal,
  });

  if (response.status === 401) throw createError('token has been expired');
  if (response.status === 500) throw createError('Internal server error', { cause: response });

  const { data } = await response.json();
  return data as PublicUser[];
}

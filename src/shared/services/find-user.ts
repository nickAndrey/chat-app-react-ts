import type { PublicUser } from '../types/user';
import { apiClient } from '../utils/api-client';

type Args = {
  searchValue: string;
  options?: { signal: AbortSignal };
};

export function findUser({ searchValue, options }: Args) {
  return apiClient<PublicUser[]>('/users/search', {
    method: 'POST',
    body: { search: searchValue },
    signal: options?.signal,
  });
}

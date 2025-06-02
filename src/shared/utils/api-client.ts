import { createError } from './create-error';

type ApiOptions = {
  method?: string;
  body?: Record<string, unknown>;
  signal?: AbortSignal;
  headers?: Record<string, string>;
};

export async function apiClient<T>(
  endpoint: string,
  { method = 'GET', body, signal, headers }: ApiOptions = {}
): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (response.status === 401) throw createError('token has been expired');
  if (response.status >= 500) throw createError('Internal server error', { cause: response });

  const json = await response.json();

  if (!response.ok) {
    const message = json?.message || 'Request failed';
    throw createError(message);
  }

  return json.data as T;
}

import type { Message } from '../types/message';
import { createError } from '../utils/create-error';

const url = `${import.meta.env.VITE_API_URL}/messages`;

type Args = {
  roomId: string;
  senderId: string;
  content: string;
  options?: { signal: AbortSignal };
};

export async function messagesCreate({ roomId, senderId, content, options }: Args) {
  const bodyDTO: Pick<Message, 'roomId' | 'senderId' | 'content'> = {
    roomId,
    senderId,
    content,
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyDTO),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    signal: options?.signal,
  });

  if (response.status === 401) throw createError('token has been expired');
  if (response.status === 500) throw createError('Internal server error', { cause: response });

  const { data } = await response.json();
  return data as Message;
}

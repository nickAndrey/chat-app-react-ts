import type { Room } from '../types/room';
import type { PublicUser } from '../types/user';
import { createError } from '../utils/create-error';

const url = `${import.meta.env.VITE_API_URL}/rooms`;

type Args = {
  members: PublicUser[];
  name?: string;
  isGroup?: boolean;
  options?: { signal: AbortSignal };
};

export async function roomCreate({ members, name, isGroup = false, options }: Args) {
  const bodyDTO: Pick<Room, 'members' | 'createdBy' | 'name' | 'isGroup'> = {
    members: members.map((member) => member.id),
    createdBy: members[0].id,
    name: name || members[1].username,
    isGroup: isGroup || false,
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
  return data as Room;
}

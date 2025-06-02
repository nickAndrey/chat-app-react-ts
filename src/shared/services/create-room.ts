import type { Room, RoomDto } from '../types/room';
import type { PublicUser } from '../types/user';
import { apiClient } from '../utils/api-client';

type Args = {
  members: PublicUser[];
  name?: string;
  isGroup?: boolean;
  options?: { signal: AbortSignal };
};

export function createRoom({ members, name, isGroup, options }: Args) {
  const bodyDTO: Pick<RoomDto, 'members' | 'createdBy' | 'name' | 'isGroup'> = {
    members: members.map((member) => member.id),
    createdBy: members[0].id,
    name: name || members[1].username,
    isGroup: isGroup || false,
  };

  return apiClient<Room>('/rooms', {
    method: 'POST',
    body: bodyDTO,
    signal: options?.signal,
  });
}

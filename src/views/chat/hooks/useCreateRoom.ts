import { roomCreate } from '@/shared/services/room-create';
import type { Room } from '@/shared/types/room';
import type { PublicUser } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';

type Args = {
  user: PublicUser | null;
  selectedUser: PublicUser | null;
};

const useCreateRoom = ({ user, selectedUser }: Args) => {
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const onRoomCreate = async () => {
      let members: PublicUser[] = [];

      if (user && selectedUser) {
        members = [user, selectedUser];
      }

      try {
        const roomApi = await roomCreate({ members, options: { signal: controller.signal } });
        setRoom(roomApi);
      } catch (error) {
        const { message } = handleError(error);
        console.log(message);
      }
    };

    onRoomCreate();

    return () => {
      controller.abort();
    };
  }, [user, selectedUser]);

  return {
    room,
  };
};

export default useCreateRoom;

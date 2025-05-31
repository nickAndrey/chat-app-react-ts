import { roomCreate } from '@/shared/services/room-create';
import { roomsGetAllByUser } from '@/shared/services/rooms-get-all-by-user';
import type { Room } from '@/shared/types/room';
import type { PublicUser } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';

type Args = {
  user: PublicUser;
};

const useRooms = ({ user }: Args) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const onGetAllRooms = async () => {
      try {
        const roomsAPI = await roomsGetAllByUser({
          userID: user.id,
          options: { signal: controller.signal },
        });
        setRooms(roomsAPI);
      } catch (error) {
        const { message } = handleError(error);
        console.log(message);
      }
    };

    onGetAllRooms();

    return () => {
      controller.abort();
    };
  }, [user]);

  const onRoomCreate = async (user: PublicUser, selectedUser: PublicUser) => {
    let members: PublicUser[] = [];

    if (user && selectedUser) {
      members = [user, selectedUser];
    }

    try {
      const newRoom = await roomCreate({ members });
      setRooms((prev) => [...prev, newRoom]);
    } catch (error) {
      const { message } = handleError(error);
      console.log(message);
    }
  };

  return {
    rooms,
    onRoomCreate,
  };
};

export default useRooms;

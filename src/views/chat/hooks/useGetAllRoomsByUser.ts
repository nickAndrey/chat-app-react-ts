import { roomsGetAllByUser } from '@/shared/services/rooms-get-all-by-user';
import type { Room } from '@/shared/types/room';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';

type Args = {
  userID?: string;
};

const useGetAllRoomsByUser = ({ userID }: Args) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const onGetAllRooms = async () => {
      if (!userID) return;

      try {
        const roomsAPI = await roomsGetAllByUser({
          userID,
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
  }, [userID]);

  return {
    rooms,
  };
};

export default useGetAllRoomsByUser;

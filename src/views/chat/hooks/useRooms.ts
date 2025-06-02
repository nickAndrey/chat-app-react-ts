import { createRoom } from '@/shared/services/create-room';
import { deleteRoom } from '@/shared/services/delete-room';
import { getRooms } from '@/shared/services/get-rooms';

import type { Room } from '@/shared/types/room';
import type { PublicUser } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const getActiveRoomId = (pathname: string) => {
  const parts = pathname.split('/');
  const roomId = parts[parts.length - 1];

  return roomId;
};

type Args = {
  user: PublicUser;
};

const useRooms = ({ user }: Args) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const location = useLocation();
  const activeRoomId = getActiveRoomId(location.pathname);
  const activeRoom = rooms.find((room) => room.id === activeRoomId);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRooms = async () => {
      try {
        const roomsAPI = await getRooms({
          userId: user.id,
          options: { signal: controller.signal },
        });

        setRooms(roomsAPI);
      } catch (error) {
        const { message } = handleError(error);
        console.error(message);
      }
    };

    fetchRooms();

    return () => {
      controller.abort();
    };
  }, [user]);

  const handleCreateRoom = async (user: PublicUser, selectedUser: PublicUser) => {
    let members: PublicUser[] = [];

    if (user && selectedUser) {
      members = [user, selectedUser];
    }

    try {
      const newRoom = await createRoom({ members });
      setRooms((prev) => [...prev, newRoom]);
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  const handleDeleteRoom = async (memberId: string, roomId?: string) => {
    if (!roomId) return;

    try {
      await deleteRoom({ roomId, memberId });
    } catch (error) {
      const { message } = handleError(error);
      console.error(message);
    }
  };

  return {
    rooms,
    activeRoom,
    handleCreateRoom,
    handleDeleteRoom,
    clearRoomHistory: () => {},
  };
};

export default useRooms;

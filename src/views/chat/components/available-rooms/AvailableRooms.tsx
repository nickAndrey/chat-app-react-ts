import type { Room } from '@/shared/types/room';
import { type FC } from 'react';
import { NavLink } from 'react-router';

type AvailableRoomsProps = {
  rooms: Room[];
};

const AvailableRooms: FC<AvailableRoomsProps> = ({ rooms }) => {
  return (
    <div className="flex flex-col gap-2 border-r-1 border-gray-400 pr-2">
      {rooms.map((room) => {
        console.log(room);
        return (
          <div key={room.id}>
            <NavLink to={`/${room.id}`}>{room.name}</NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default AvailableRooms;

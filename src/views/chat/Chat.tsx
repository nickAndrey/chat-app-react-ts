import useAuth from '@/app/contexts/auth/useAuth';
import { DropdownWithSearch } from '@/shared/components/dropdown-with-search';
import type { PublicUser } from '@/shared/types/user';
import { useState, type FC } from 'react';
import { Outlet } from 'react-router';
import { AvailableRooms } from './components/available-rooms';
import useCreateRoom from './hooks/useCreateRoom';
import useGetAllRoomsByUser from './hooks/useGetAllRoomsByUser';
import useUserSearch from './hooks/useUserSearch';

const Chat: FC = () => {
  /**
   *
   *
   * 1. search over users
   * 2. select user
   * 3. create a room based on selected and logged in user
   * 4. add created room to the available rooms list
   * 5. last created room became active one
   * 6. show the chat for the active room
   * 7. fetch messages for the room chat
   * 8. now you can send messages to the chat participant
   *
   *
   *
   */

  /**
   * 1. hook to manage searching over users
   *
   * states:
   * - searchValue, setSearchValue
   * - usersList, setUsersList
   *
   * 2. hook to manage creating a rooms
   * - rooms, setRooms
   *
   * 3. Populate rooms list with new room
   * 4. make that room active
   * 5. show the chat view for active room
   * 6. fetch messages
   *
   */

  const { user } = useAuth();

  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  const { rooms } = useGetAllRoomsByUser({ userID: user?.id });
  const { setSearchValue, searchValue, usersList } = useUserSearch();
  const { room } = useCreateRoom({ user, selectedUser });

  console.log({ room });

  return (
    <div className="grid grid-cols-[auto_1fr] w-full max-w-[800px] max-h-[75vh] h-full bg-gray-100 shadow-md shadow-gray-400 rounded-md p-4">
      <div>
        <DropdownWithSearch
          closeOnSelect
          items={usersList}
          searchValue={searchValue || ''}
          setSearchValue={setSearchValue}
          onSelectItem={(item) => setSelectedUser(item)}
          renderOption={(item) => (
            <div className="px-4 py-2 hover:bg-gray-200 transition-colors">
              <h4>{item.username}</h4>
              <i>{item.email}</i>
            </div>
          )}
        />
        <AvailableRooms rooms={rooms} />
      </div>

      <Outlet />
    </div>
  );
};

export default Chat;

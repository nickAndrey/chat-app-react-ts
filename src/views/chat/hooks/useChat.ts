import type { PublicUser } from '@/shared/types/user';
import { useLocation } from 'react-router';
import useMessages from './useMessages';
import useRooms from './useRooms';
import useUserSearch from './useUserSearch';

const getActiveRoomId = (pathname: string) => {
  const parts = pathname.split('/');
  const roomId = parts[parts.length - 1];

  return roomId;
};

type Args = {
  user: PublicUser;
};

const useChat = ({ user }: Args) => {
  const location = useLocation();
  const activeRoomId = getActiveRoomId(location.pathname);

  const { rooms, onRoomCreate } = useRooms({ user });
  const { messages, currentMessage, setCurrentMessage, sendMessage } = useMessages({
    user,
    activeRoomId,
  });
  const { usersList, searchValue, selectedUser, setSelectedUser, setSearchValue } = useUserSearch();

  // connect search and rooms creation flows
  const handleRoomCreate = (selectedUser: PublicUser | null) => {
    setSelectedUser(selectedUser);

    if (selectedUser) {
      onRoomCreate(user, selectedUser);
    }
  };

  return {
    rooms,
    messagesProps: {
      messages,
      currentMessage,
      setCurrentMessage,
      sendMessage,
    },
    userSearchProps: {
      usersList,
      searchValue,
      selectedUser,
      setSearchValue,
      handleRoomCreate,
    },
  };
};

export default useChat;

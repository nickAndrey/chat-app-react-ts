import type { PublicUser } from '@/shared/types/user';
import useMessages from './useMessages';
import useRooms from './useRooms';
import useUserSearch from './useUserSearch';

type Args = {
  user: PublicUser;
};

const useChat = ({ user }: Args) => {
  const { usersList, searchValue, selectedUser, setSelectedUser, setSearchValue } = useUserSearch();

  const { rooms, activeRoom, handleCreateRoom, handleDeleteRoom } = useRooms({ user });

  const { messages, currentMessage, setCurrentMessage, sendMessage } = useMessages({
    user,
    activeRoomId: activeRoom?.id,
  });

  // connect search and rooms creation flows
  const handleRoomCreate = (selectedUser: PublicUser | null) => {
    setSelectedUser(selectedUser);

    if (selectedUser) {
      handleCreateRoom(user, selectedUser);
    }
  };

  return {
    rooms,
    activeRoom,
    roomActions: {
      handleDeleteRoom,
    },
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

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

  const {
    messages,
    currentMessage,
    setCurrentMessage,
    handleCreateMessage,
    handleUpdateMessage,
    handleDeleteMessage,
  } = useMessages({ user, activeRoomId: activeRoom?.id });

  /**
   * #### Compound actions:
   * 1. Set state for selected user in the search dropdown
   * 2. Create a new room or reattach selected user to the room he left previously (will have history back)
   **/
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
      handleRoomCreate,
    },
    messagesProps: {
      messages,
      currentMessage,
      setCurrentMessage,
      handleCreateMessage,
      handleUpdateMessage,
      handleDeleteMessage,
    },
    userSearchProps: {
      usersList,
      searchValue,
      selectedUser,
      setSearchValue,
    },
  };
};

export default useChat;

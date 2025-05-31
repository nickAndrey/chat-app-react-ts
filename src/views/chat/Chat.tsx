import useAuthenticatedUser from '@/app/contexts/auth/useAuthenticatedUser';
import { DropdownWithSearch } from '@/shared/components/dropdown-with-search';
import { Box } from '@mui/material';
import { type FC } from 'react';
import { AvailableRooms } from './components/available-rooms';
import { MessageInput } from './components/message-input';
import { Messages } from './components/messages';
import useChat from './hooks/useChat';

const CHAT_HEIGHT = '80vh';

const Chat: FC = () => {
  const user = useAuthenticatedUser();
  const { rooms, messagesProps, userSearchProps } = useChat({ user });

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        height: CHAT_HEIGHT,
        width: '100%',
      }}
    >
      <Box
        component="aside"
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          maxHeight: CHAT_HEIGHT,
          backgroundColor: '#283e4a',
          px: 2,
          pt: 4,
        }}
      >
        <DropdownWithSearch
          searchInputProps={{
            searchValue: userSearchProps.searchValue || '',
            setSearchValue: userSearchProps.setSearchValue,
          }}
          dropdownProps={{
            items: userSearchProps.usersList,
            selectedItem: userSearchProps.selectedUser,
            onSelectItem: userSearchProps.handleRoomCreate,
            renderOption: (item) => (
              <div>
                <h4>{item.username}</h4>
                <i>{item.email}</i>
              </div>
            ),
          }}
        />

        <AvailableRooms rooms={rooms} />
      </Box>

      <Box
        sx={{
          bgcolor: 'white',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          maxHeight: CHAT_HEIGHT,
        }}
      >
        <Messages messages={messagesProps.messages} userId={user.id} />
        <MessageInput
          currentMessage={messagesProps.currentMessage}
          setCurrentMessage={messagesProps.setCurrentMessage}
          sendMessage={messagesProps.sendMessage}
        />
      </Box>
    </Box>
  );
};

export default Chat;

import useAuthenticatedUser from '@/app/contexts/auth/useAuthenticatedUser';
import { DropdownWithSearch } from '@/shared/components/dropdown-with-search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
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
        borderRadius: '16px',
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
          gridTemplateRows: 'auto 1fr auto',
          maxHeight: CHAT_HEIGHT,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gridColumn: '1/-1',
            px: 2,
            py: 1,
            borderBottom: `1px solid ${grey['400']}`,
          }}
        >
          <div>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Messages messages={messagesProps.messages} userId={user.id} />

        <Box sx={{ px: 2, py: 1, width: '100%' }}>
          <MessageInput
            currentMessage={messagesProps.currentMessage}
            setCurrentMessage={messagesProps.setCurrentMessage}
            sendMessage={messagesProps.sendMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;

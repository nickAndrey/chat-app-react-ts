import useAuthenticatedUser from '@/app/contexts/auth/useAuthenticatedUser';
import { DropdownWithSearch } from '@/shared/components/dropdown-with-search';
import { PopoverElement } from '@/shared/components/popover-element';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { type FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AvailableRooms } from './components/available-rooms';
import { MessageCloud } from './components/message-cloud';
import { MessageInput } from './components/message-input';
import useChat from './hooks/useChat';

const CHAT_HEIGHT = '80vh';

const Chat: FC = () => {
  const user = useAuthenticatedUser();
  const { rooms, activeRoom, roomActions, messagesProps, userSearchProps } = useChat({ user });

  return (
    <Box
      sx={{
        width: '100%',
        height: CHAT_HEIGHT,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: 'white',
      }}
    >
      {/* Rooms */}
      <Box
        component="aside"
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          maxHeight: CHAT_HEIGHT,
          bgcolor: '#283e4a',
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

      {/* Chat Body */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gridTemplateColumns: '1fr auto',
          maxHeight: CHAT_HEIGHT,
        }}
      >
        {/* Chat Header */}
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
          {activeRoom && (
            <div>
              <Typography variant="h6">
                {activeRoom.members.filter((item) => item.id !== user.id)[0].username}
              </Typography>
              <Typography variant="caption">
                {activeRoom.members.filter((item) => item.id !== user.id)[0].email}
              </Typography>
            </div>
          )}

          <PopoverElement
            id="rooms-actions"
            triggerRenderer={({ handleClick }) => (
              <IconButton onClick={handleClick} disabled={!activeRoom} sx={{ ml: 'auto' }}>
                <MoreVertIcon />
              </IconButton>
            )}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <List component="nav">
                {/* <ListItemButton onClick={() => roomActions.clearRoomHistory(activeRoom?.id)}>
                  <ListItemText
                    primary={<Typography variant="body2">Clear Room History</Typography>}
                  />
                </ListItemButton> */}

                <ListItemButton
                  onClick={() => {
                    roomActions.handleDeleteRoom(user.id, activeRoom?.id);
                  }}
                >
                  <ListItemText primary={<Typography variant="body2">Delete Room</Typography>} />
                </ListItemButton>
              </List>
            </Box>
          </PopoverElement>
        </Box>

        {/* Messages */}
        <Box sx={{ px: 2, py: 2 }}>
          <Virtuoso
            data={messagesProps.messages}
            itemContent={(_, message) => (
              <MessageCloud
                key={message.id}
                message={message.content}
                isCurrentUserSender={message.senderId === user.id}
                sx={{ mb: 1 }}
              />
            )}
            followOutput="smooth"
          />
        </Box>

        {/* Message input */}
        <Box sx={{ px: 2, py: 1, gridColumn: '1/-1' }}>
          <MessageInput
            disabled={!activeRoom}
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

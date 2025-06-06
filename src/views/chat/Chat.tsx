import useAuthenticatedUser from '@/app/contexts/auth/useAuthenticatedUser';
import { DropdownWithSearch } from '@/shared/components/dropdown-with-search';
import { PopoverElement } from '@/shared/components/popover-element';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { type FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AvailableRooms } from './components/available-rooms';
import { MessageActions } from './components/message-actions';
import { MessageCloud } from './components/message-cloud';
import { MessageInput } from './components/message-input';
import useChat from './hooks/useChat';

const CHAT_HEIGHT = '80vh';

const Chat: FC = () => {
  const user = useAuthenticatedUser();
  const { rooms, activeRoom, roomActions, messagesProps, userSearchProps } = useChat({ user });

  return (
    <Paper
      elevation={2}
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
            onSelectItem: roomActions.handleRoomCreate,
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
              <PopoverElement
                key={message.id}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                triggerRenderer={({ handleClick }) => (
                  <MessageCloud
                    message={message.content}
                    updatedAt={message.updatedAt}
                    isCurrentUserSender={message.senderId === user.id}
                    sx={{ mb: 1 }}
                    onClick={handleClick}
                  />
                )}
              >
                <MessageActions
                  handleEdit={() =>
                    messagesProps.handleUpdateMessage({
                      roomId: message.roomId,
                      messageId: message.id,
                      content: '',
                    })
                  }
                  handleDelete={() =>
                    messagesProps.handleDeleteMessage({
                      roomId: message.roomId,
                      memberId: user.id,
                      messageId: message.id,
                    })
                  }
                />
              </PopoverElement>
            )}
            followOutput="smooth"
            style={{ height: '100%' }}
          />
        </Box>

        {/* Message input */}
        <Box sx={{ px: 2, py: 1, gridColumn: '1/-1' }}>
          <MessageInput
            disabled={!activeRoom}
            currentMessage={messagesProps.currentMessage}
            setCurrentMessage={messagesProps.setCurrentMessage}
            sendMessage={(message) =>
              messagesProps.handleCreateMessage({
                roomId: activeRoom?.id,
                senderId: user.id,
                content: message,
              })
            }
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Chat;

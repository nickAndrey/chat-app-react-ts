import type { Room } from '@/shared/types/room';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useEffect, type FC } from 'react';
import { NavLink, useNavigate } from 'react-router';

type AvailableRoomsProps = {
  rooms: Room[];
};

const AvailableRooms: FC<AvailableRoomsProps> = ({ rooms }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // sort by date updated and redirect
    if (rooms.length > 0) {
      navigate(`/${rooms[rooms.length - 1].id}`);
    }
  }, [navigate, rooms]);

  return (
    <List
      component="nav"
      sx={{
        overflow: 'auto',
        mx: '-16px',

        '&::-webkit-scrollbar': {
          width: '0.5vw',
        },

        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },

        '::-webkit-scrollbar-thumb': {
          bgcolor: 'rgba(255,255,255, 0.5)',
          borderRadius: '10px',
        },
      }}
    >
      {rooms.map((room) => (
        <ListItemButton
          key={room.id}
          LinkComponent={NavLink}
          sx={{
            color: 'white',
            '&:not(:last-child)': {
              borderBottom: `1px solid ${blueGrey['600']}`,
            },
            '&.active': {
              backgroundColor: blueGrey['700'],
            },
          }}
          {...{ to: `/${room.id}` }}
        >
          <ListItemText primary={room.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default AvailableRooms;

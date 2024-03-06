import { Box, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import React, { useState } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import useAuth from 'src/hooks/useAuth';

const Profile = () => {
  const { logout } = useAuth()
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    logout()
    window.location.reload();
  }
  
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="avatar.png"
          alt="avatar"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MailRoundedIcon width={20} />
          </ListItemIcon>
          <ListItemText>Mi Cuenta</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PlaylistAddCheckRoundedIcon width={20} />
          </ListItemIcon>
          <ListItemText>Mis Tareas</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleLogout}
            fullWidth
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile
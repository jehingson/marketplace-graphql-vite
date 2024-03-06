import React from 'react'
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import Profile from './Profile';
import { storeSettings, restoreSettings } from 'src/contexts/settings-context';


interface PropsT {
  toggleMobileSidebar: () => void
  toggleSidebar: () => void
}

const Header = ({ toggleMobileSidebar, toggleSidebar }: PropsT) => {

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const handleDarkMode = () => {
    let settings = null;
    try {
      const storedData: string | null = window.localStorage.getItem('settings');
      if (storedData) {
        settings = JSON.parse(storedData);
      } else {
        settings = {
          direction: 'ltr',
          responsiveFontSizes: true,
          theme: window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        };
      }
      // storeSettings()
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <AppBarStyled position="sticky">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              sx: "inline"
            }
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
        
        
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton >
            <SettingsBrightnessOutlinedIcon stroke="1.5" />
          </IconButton>
          <IconButton>
            <Badge variant="dot" color="primary">
              <NotificationsActiveRoundedIcon stroke="1.5" />
            </Badge>
          </IconButton>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  )
}

export default Header
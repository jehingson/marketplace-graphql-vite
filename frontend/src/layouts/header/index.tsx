import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Profile from './Profile';
import useAuth from 'src/hooks/useAuth';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link, useLocation } from 'react-router-dom';
import useCardCount from 'src/hooks/useCardCount';

interface PropsT {
  toggleMobileSidebar: () => void;
  toggleSidebar: () => void;
  setCardOpen: (value: boolean) => void;
}
const Header = ({ toggleMobileSidebar, toggleSidebar, setCardOpen }: PropsT) => {
  const { isAuthenticated } = useAuth();
  const { count } = useCardCount();
  const location = useLocation();
  const isParamLogin = location.pathname === '/login';
  const isParamRegister = location.pathname === '/register';
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

  return (
    <AppBarStyled position="sticky">
      <ToolbarStyled>
        {isAuthenticated ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              display: {
                lg: 'none',
                sx: 'inline',
              },
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
        ) : (
          <>
            <Link to="/">
              <Box display="flex" justifyContent="center" py={3}>
                <Box
                  component="img"
                  sx={{
                    height: '20px',
                  }}
                  src="/merck.svg"
                  alt="logo"
                />
              </Box>
            </Link>
          </>
        )}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {!isParamLogin && !isParamRegister && (
            <IconButton onClick={() => setCardOpen(true)}>
              <Badge variant="standard" color="primary" badgeContent={count}>
                <ShoppingCartRoundedIcon stroke="1.5" />
              </Badge>
            </IconButton>
          )}

          {isAuthenticated ? (
            <>
              <IconButton>
                <Badge variant="dot" color="primary">
                  <NotificationsActiveRoundedIcon stroke="1.5" />
                </Badge>
              </IconButton>
              <Profile />
            </>
          ) : (
            <>
              <Button
                variant={isParamLogin ? 'contained' : 'text'}
                color={isParamLogin ? 'primary' : 'inherit'}
                component={Link}
                to="/login"
              >
                Ingresar
              </Button>
              <Button
                variant={isParamRegister ? 'contained' : 'text'}
                color={isParamRegister ? 'primary' : 'inherit'}
                component={Link}
                to="/register"
              >
                Registrar
              </Button>
            </>
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, Container, Box } from '@mui/material';
import Header from './header';
import Sidebar from './sidebar';
import useAuth from 'src/hooks/useAuth';
import DrawerCard from 'src/components/card/DrawerCard';
import Pyment from 'src/components/pyment';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCardOpen, setCardOpen] = useState(false);

  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}

      {isAuthenticated && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      )}
      <Pyment />
      <PageWrapper>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          setCardOpen={setCardOpen}
        />
        <DrawerCard isCardOpen={isCardOpen} handleClose={() => setCardOpen(false)} />
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            padingTop: '20px',
            maxWidth: '1400px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
        </Container>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default Layout;

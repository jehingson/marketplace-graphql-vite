import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { styled, Container, Box } from '@mui/material';
import Header from './header';
import Sidebar from './sidebar';

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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  

  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        isMobileSidebarOpen={isMobileSidebarOpen} 
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            padingTop: "20px",
            maxWidth: "1400px"
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
  )
}

export default Layout
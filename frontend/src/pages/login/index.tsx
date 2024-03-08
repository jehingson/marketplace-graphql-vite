import PageLayout from '@/layouts/PageLayout';
import LoginEndRegister from '@/components/autentication/LoginEndRegister';
import Header from 'src/layouts/header';
import { useState } from 'react';
import { Box, Container } from '@mui/material';

export default function Login() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageLayout title="Iniciar sesión - Markes Places" type="empty">
      <Header
        setCardOpen={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      <Container
        sx={{
          padingTop: '20px',
          maxWidth: '1400px',
        }}
      >
        <Box sx={{ minHeight: 'calc(100vh - 170px)', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoginEndRegister />
        </Box>
      </Container>
    </PageLayout>
  );
}

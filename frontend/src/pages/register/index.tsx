import PageLayout from "@/layouts/PageLayout";
import LoginEndRegister from "@/components/autentication/LoginEndRegister";
import { useState } from "react";
import Header from "src/layouts/header";
import { Box, Container } from "@mui/material";


export default function Register() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageLayout title="Register - Markes Places" type="empty">
      <Header
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      <Container
        sx={{
          padingTop: '20px',
          maxWidth: '1400px',
        }}
      >
        <Box sx={{ minHeight: 'calc(100vh - 170px)', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoginEndRegister typeRegister />
        </Box>
      </Container>
    </PageLayout>
  );
}

import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PageLayout from 'src/layouts/PageLayout';

export const ErrorPage = () => {
  return (
    <PageLayout title="Pagina no encontrado - Markes Places" type="empty">
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        textAlign="center"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <img
            src="/404-error-idea.gif"
            alt="404"
            style={{ width: '100%', maxWidth: '300px' }}
          />
          <Typography align="center" variant="h1" mb={4}>
            Opps!!!
          </Typography>
          <Typography align="center" variant="h4" mb={4}>
          Esta página que estás buscando no se pudo encontrar.
          </Typography>
          <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
            Go Back to Home
          </Button>
        </Container>
      </Box>
    </PageLayout>
  );
};

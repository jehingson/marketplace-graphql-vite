import { Box, Typography } from '@mui/material';

export default function ContructionComponent() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{
        height: '85vh',
      }}
    >
      <Box
        component="img"
        alt="constructor"
        src="/development.png"
        sx={{
          height: '60vh',
          width: '100%',
          objectFit: "contain"
        }}
      />
      <Typography variant="h3" color="textSecondary">
        En Desarrollo
      </Typography>
    </Box>
  );
}

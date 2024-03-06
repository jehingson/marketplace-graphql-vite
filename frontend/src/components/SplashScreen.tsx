import type { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const SlashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000,
    }}
  >
    <CircularProgress />
  </Box>
);

export default SlashScreen;

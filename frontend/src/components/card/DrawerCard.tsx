import { Box, Divider, Drawer } from '@mui/material';
import CardList from './CardList';

interface Props {
  isCardOpen: boolean
  handleClose: () => void
}

export default function DrawerCard({ isCardOpen, handleClose  }: Props) {
  return (
    <Drawer
      anchor="right"
      open={isCardOpen}
      onClose={handleClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: '350px',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ height: '100%' }}>
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
        <Divider />  
        <CardList handleClose={handleClose} />
      </Box>
    </Drawer>
  );
}

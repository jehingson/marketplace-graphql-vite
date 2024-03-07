import { Box, Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined';
interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
  accessible: number;
}
export default function CardQuantityGeneral({ quantity, setQuantity  }: Props) {
  return (
    <Box display="flex" alignItems="center" gap={1} py={1}>
      <Button
        color="error"
        variant='outlined'
        sx={{
          padding: 0,
        }}
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          } else {
            toast.error('Debes agregar minimo un producto');
          }
        }}
      >
        <RemoveOutlinedIcon />
      </Button>
      <Typography>{quantity}</Typography>
      <Button
        color="primary"
        variant='outlined'
        sx={{
          padding: 0,
        }}
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <PlusOneOutlinedIcon />
      </Button>
    </Box>
  );
}

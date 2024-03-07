import { Box, Button, Dialog, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { calculatePriceTax } from 'src/utils/calculatePricesTax';
import { Product } from 'src/types/product';

interface Props {
  selectProduct: Product | null;
  setSelectProduct: (value: Product | null) => void;
}

export default function ViewProduct({ selectProduct, setSelectProduct }: Props) {
  return (
    <Dialog open={selectProduct ? true : false} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={selectProduct?.image ?? ''}
          alt="img"
          sx={{
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </Box>
      <Box p={2}>
        <Typography variant="h5">{selectProduct?.name ?? ''}</Typography>
        <Typography variant="body1" color="textSecondary">
          {selectProduct?.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Eligendi vero unde aperiam cupiditate sequi recusandae provident dicta sapiente harum
          reprehenderit, id asperiores excepturi ad debitis, deleniti reiciendis facilis atque
          libero.
        </Typography>
        <Typography color="primary" variant='h6'>
          <Typography component="span">Disponibles:</Typography> {selectProduct?.quantity ?? 0}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
          </Box>
          <Typography variant="h4" color="indigo">
            {calculatePriceTax(selectProduct?.prices ?? 0, selectProduct?.tax ?? false)} $
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button color="inherit" variant="outlined" onClick={() => setSelectProduct(null)}>
            Cerrar
          </Button>
          <Button 
            variant="contained" 
            endIcon={<AddShoppingCartOutlinedIcon />}
            disabled={(selectProduct?.quantity ?? 0) < 1 ? true : false}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

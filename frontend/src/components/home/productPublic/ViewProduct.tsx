import { Box, Button, Dialog, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { calculatePriceTax, formatNumberCurrency } from 'src/utils/calculatePricesTax';
import { Product } from 'src/types/product';
import CardQuantityGeneral from 'src/components/general/CardQuantityGeneral';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  selectProduct: Product | null;
  setSelectProduct: (value: Product | null) => void;
  handleCardProduct: (value: any) =>void
}


export default function ViewProduct({ selectProduct, setSelectProduct, handleCardProduct }: Props) {
  const [quantity, setQuantity] = useState<number>(1);


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
          {selectProduct?.description}
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
            {formatNumberCurrency(calculatePriceTax(selectProduct?.prices ?? 0, selectProduct?.tax ?? false, quantity))}
          </Typography>
        </Box>
        <Box>
          <CardQuantityGeneral
            quantity={quantity}
            setQuantity={setQuantity}
            accessible={selectProduct?.quantity ?? 0}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button color="inherit" variant="outlined" onClick={() => setSelectProduct(null)}>
            Cerrar
          </Button>
          <Button 
            variant="contained" 
            endIcon={<AddShoppingCartOutlinedIcon />}
            disabled={(selectProduct?.quantity ?? 0) < 1 ? true : false}
            onClick={() => {
              handleCardProduct({
                product: selectProduct,
                quantity
              })
              toast.success("¡Producto cargado al carrito con éxito!")
              setQuantity(1)
            }}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

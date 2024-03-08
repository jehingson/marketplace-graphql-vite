import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Product } from 'src/types/product';
import { calculatePriceTax, formatNumberCurrency } from 'src/utils/calculatePricesTax';
import StarIcon from '@mui/icons-material/Star';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useState } from 'react';
import toast from 'react-hot-toast';
import CardQuantityGeneral from 'src/components/general/CardQuantityGeneral';

interface Props {
  product: Product;
  setSelectProduct: (value: Product) => void;
  handleCardProduct: (value: any) => void;
}

export default function ItemProduct({ product, setSelectProduct, handleCardProduct }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <Paper
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
        src={product.image}
        alt="img"
        sx={{
          objectFit: 'contain',
          width: '100%',
          height: { xs: 300, md: 200 },
        }}
      />
      <Box sx={{ position: 'absolute', top: 0 }}>
        <IconButton color="inherit">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </Box>
      <Box p={2}>
        <Typography variant="body1"
          sx={{
            fontWeight: "bold",
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 1,
            textOverflow: 'ellipsis',
          }}
        >{product.name}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontWeight: 600,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", justifyItems: "center" }}>
          <Typography color="primary" variant="body2" fontWeight="600">
            Disponibles: {product?.quantity ?? 0}
          </Typography>
          <Typography variant='body2' sx={{ fontWeight: "bold"}}>{product?.sku ?? ""}</Typography>
        </Box>
       
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
          </Box>
          <Typography variant="h4" color="indigo">
            {formatNumberCurrency(calculatePriceTax(product.prices, product.tax, quantity))}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <CardQuantityGeneral
            quantity={quantity}
            setQuantity={setQuantity}
            accessible={product?.quantity ?? 0}
          />
          <IconButton color="primary" onClick={() => setSelectProduct(product)}>
            <PreviewOutlinedIcon />
          </IconButton>
        </Box>
        <Box>
          <Button
            variant="contained"
            fullWidth
            endIcon={<AddShoppingCartOutlinedIcon />}
            onClick={() => {
              handleCardProduct({
                product,
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
    </Paper>
  );
}

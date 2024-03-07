import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Product } from 'src/types/product';
import { calculatePriceTax } from 'src/utils/calculatePricesTax';
import StarIcon from '@mui/icons-material/Star';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

interface Props {
  product: Product;
  setSelectProduct: (value: Product) => void;
}
export default function ItemProduct({ product, setSelectProduct }: Props) {
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
        }}
      />
      <Box sx={{ position: 'absolute', top: 0 }}>
        <IconButton color="inherit">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </Box>
      <Box p={2}>
        <Typography variant="h5">{product.name}</Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
          }}
        >
          {product.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          vero unde aperiam cupiditate sequi recusandae provident dicta sapiente harum
          reprehenderit, id asperiores excepturi ad debitis, deleniti reiciendis facilis atque
          libero.
        </Typography>
        <Typography color="primary" variant="h6">
          <Typography component="span">Disponibles:</Typography> {product?.quantity ?? 0}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
            <StarIcon color="warning" fontSize="small" />
          </Box>
          <Typography variant="h4" color="indigo">
            {calculatePriceTax(product.prices, product.tax)} $
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" endIcon={<AddShoppingCartOutlinedIcon />}>
            Comprar
          </Button>
          <IconButton color="primary" onClick={() => setSelectProduct(product)}>
            <PreviewOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

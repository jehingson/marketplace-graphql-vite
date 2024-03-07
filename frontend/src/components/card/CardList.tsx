import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useCardCount from 'src/hooks/useCardCount';
import { setPymentModal } from 'src/slices/products';
import { useDispatch } from 'src/store';
import { calculatePriceTax } from 'src/utils/calculatePricesTax';

export default function CardList({
  handleClose,
  verify = false,
}: {
  handleClose: () => void;
  verify?: boolean;
}) {
  const { count, card, totalPrice } = useCardCount();
  // const handleDeleteCard = (product) => {};
  const dispatch = useDispatch();
  // const handleSumCard = (product, quantity) => {};

  // const handleRestCard = (product, quantity) => {};

  const handlePyment = () => {
    
  }

  return (
    <Box>
      {card && card.length ? (
        <>
          <TableContainer style={{ width: '100%' }}>
            <Table
              aria-label="simple table"
              sx={{
                '& .MuiTableCell-head': {
                  color: 'textSecondary',
                  fontWeight: 'bold',
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Foto</TableCell>
                  <TableCell align="center">Producto</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {card.map((itm) => {
                  const { product, quantity } = itm;
                  return (
                    <TableRow>
                      <TableCell sx={{ p: 0, pl: 1 }}>
                        <Box
                          component="img"
                          src={product?.image ?? '/photo.png'}
                          alt="photo"
                          sx={{ width: 50 }}
                        />
                      </TableCell>
                      <TableCell sx={{ p: 0, px: 1 }}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 1,
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {product.name} Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 0, pr: 2 }} align="center">
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }} color="indigo">
                          {calculatePriceTax(product.prices, product.tax)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">{quantity}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            <Box
              sx={{
                px: 5,
                mt: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>Cantidad Producto:</Typography>
              <Typography component="span" variant="h4">
                {count}
              </Typography>
            </Box>
            <Box
              sx={{
                px: 5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>Total $:</Typography>
              <Typography component="span" variant="h4" color="indigo">
                {totalPrice}
              </Typography>
            </Box>
          </Box>

          <Box px={5} pb={2}>
            <Button
              onClick={() => {
                if (!verify) {
                  dispatch(setPymentModal(true));
                  handleClose();
                } else {
                  handlePyment()
                }
              }}
              variant="contained"
              fullWidth
            >
              Comprar (Pagar)
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box p={2}>
            <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 10 }}>
              "¡Tu carrito está esperando por ti! ¡Añade algo especial hoy!"
            </Typography>
          </Box>
          <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} color="inherit" variant="outlined" size="small">
              Cerrar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

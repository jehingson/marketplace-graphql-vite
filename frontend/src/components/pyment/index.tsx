import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { useDispatch, useSelector } from 'src/store';
import LoginEndRegister from '../autentication/LoginEndRegister';
import CardList from '../card/CardList';
import { setPymentModal } from 'src/slices/products';

export default function Pyment() {
  const auth = useAuth();
  const { user } = auth
  const dispatch = useDispatch();
  const { isAuthenticated } = auth;
  const [register, setRegister] = useState<boolean>(false);
  const { pymentModal } = useSelector((store) => store.product_state);

  const handleClose = () => {
    dispatch(setPymentModal(false));
  };

  return (
    <Dialog open={pymentModal} fullWidth maxWidth="sm">
      <DialogContent>
        {!isAuthenticated ? (
          <>
            <Typography px={2} py={3} color="textSecondary" variant="body2">
              ¡{register ? 'Registrate' : 'Inicia sesión'} ahora y disfruta de una experiencia de
              pago rápida y segura! Completa tu compra con tan solo unos clics. ¡Tu satisfacción es
              nuestra prioridad!
            </Typography>
            <LoginEndRegister modal typeRegister={register} />
            <Box pt={2} px={2} display="flex" justifyContent="end">
              <Button onClick={handleClose} color="inherit">
                Cancelar
              </Button>
              <Button onClick={() => setRegister(!register)}>
                {register
                  ? '¿Quieres iniciar sesión? ¡Haz clic aquí!'
                  : 'Registrar cuenta ¡Haz clic aquí!'}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography px={2} py={3} color="textSecondary" variant='body2'>
              ¡Hola <Typography component="span" variant='h5' color="primary">{user?.username ?? ""}</Typography>! ¿Listo para finalizar tu compra? No olvides revisar tu lista de carrito para
              asegurarte de que tienes todos los productos que deseas. ¡Es momento de pagar y
              disfrutar de tus compras! ¡Gracias por elegirnos!
            </Typography>
            <CardList handleClose={handleClose} verify />
            <Box pt={2} px={2} display="flex" justifyContent="end">
              <Button onClick={handleClose} color="inherit">
                Cancelar
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

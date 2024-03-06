import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import UPDATED_ACCOUNT from 'src/graphql/mutations/accounts/updatedAccount';
import useAuth from 'src/hooks/useAuth';

export default function RoleSales() {
  const { user, updateUser } = useAuth();
  const [show, setShow] = useState<boolean>(false);
  
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        minHeight: 'calc(100vh - 170px)',
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h5">Registrate como vendedor</Typography>
            <br />

            <Typography variant="body1" color="textSendary">
              ¡Hola{' '}
              <Typography component="span" variant="h5" color="primary">
                {user?.username ?? ''}
              </Typography>
              ! En nuestra aplicación, es fundamental que todos nuestros usuarios acepten los
              términos y condiciones para poder disfrutar de todos los beneficios y servicios que
              ofrecemos.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" onClick={() => setShow(true)}>
                Aceptar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Confirmar show={show} setShow={setShow} updateUser={updateUser} />
    </Box>
  );
}

const Confirmar = ({ show, setShow, updateUser }: { show: boolean; setShow: (value: boolean) => void, updateUser: (value: any) => void }) => {
  const [updateAccount, { loading }] = useMutation(UPDATED_ACCOUNT, {
    onCompleted: (data) => {
      const { updateAccount = data } = data;
      if (updateAccount?.success) {
        toast.success('Operación exitosa.');
        setTimeout(() => {
          updateUser(updateAccount)
          setShow(false)
        }, 2000)
      }
    },
    onError: (err) => {
      const message = err?.message ?? 'Algo salió mal, valué a intentarlo.';
      toast.error(message);
    },
  });

  const subtmitUpdataRole = async () => {
    try {
      await updateAccount({
        variables: {
          role: 'sales',
        },
      });
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <Dialog open={show} maxWidth="md" onClose={() => setShow(false)}>
      <DialogContent>
        <DialogTitle variant="h4">Acepta los terminos y condiciones</DialogTitle>
        <Typography variant="body1" color="textSendary">
          ¡No esperes más y acepta los términos y condiciones para comenzar a vender con total
          confianza! ¡Estamos aquí para ayudarte en cada paso del camino!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 4 }}>
          <Button variant="outlined" color="inherit" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button 
            disabled={loading} 
            variant="contained" 
            onClick={subtmitUpdataRole}
          >
            Registrar Vendedor
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

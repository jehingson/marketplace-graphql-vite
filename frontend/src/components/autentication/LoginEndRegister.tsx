import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from 'src/validation/validationLogin';
import generate from 'src/utils/generatePassword';
import { createLoginSubmitionObject } from 'src/utils/encrypt';
import { useMutation } from '@apollo/client';
import LOGIN_REQUEST from 'src/graphql/mutations/autentication/login';
import useAuth from 'src/hooks/useAuth';
import { Link } from 'react-router-dom';
import REGISTER_REQUEST from 'src/graphql/mutations/autentication/register';

interface FormData {
  iv: string;
  username?: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const defaultValues: FormData = {
  iv: '',
  password: '',
  username: '',
  email: '',
  confirmPassword: '',
};

const LoginEndRegister = ({
  typeRegister = false,
  modal,
}: {
  typeRegister?: boolean;
  modal?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const resolver = useMemo(() => yupResolver(validationLogin(typeRegister)), []);
  const { login: loginStorage } = useAuth();

  const [register, { loading: loadingRegister }] = useMutation(REGISTER_REQUEST, {
    onCompleted: (data) => {
      const { register = null } = data;
      if (register) {
        toast.success('Operación exitosa.');
        setTimeout(() => {
          loginStorage(register);
        }, 2000);
      }
    },
    onError: (err) => {
      const message = err?.message ?? 'Algo salió mal, valué a intentarlo.';
      toast.error(message);
    },
  });

  const [login, { loading }] = useMutation(LOGIN_REQUEST, {
    onCompleted: (data) => {
      const { login = null } = data;
      if (login) {
        toast.success('Operación exitosa.');
        setTimeout(() => {
          loginStorage(login);
        }, 2000);
      }
    },
    onError: (err) => {
      const message = err?.message ?? 'Algo salió mal, valué a intentarlo.';
      toast.error(message);
    },
  });

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues, resolver });

  const submitHandler = async (formData: FormData) => {
    const tmpLoginInput = createLoginSubmitionObject(formData.password);
    const input: any = {
      ...formData,
      ...tmpLoginInput,
    };

    try {
      if (typeRegister) {
        delete input.confirmPassword;
        await register({
          variables: {
            ...input,
          },
        });
      } else {
        await login({
          variables: {
            ...input,
          },
        });
      }
    } catch (err) {
      console.info(err);
    }
  };

  const generatePassword = () => {
    const password = generate({ length: 12 });
    setValue('password', password);
    clearErrors('password');
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box
              component="img"
              sx={{
                height: '35px',
              }}
              src="/merck.svg"
              alt="logo"
            />
            {typeRegister && (
              <>
                <br />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      onChange={(event) => {
                        event.target.value = event.target.value.toLowerCase().trim();
                        field.onChange(event);
                      }}
                      label="Usuario"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />
              </>
            )}

            <br />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  onChange={(event) => {
                    event.target.value = event.target.value.toLowerCase().trim();
                    field.onChange(event);
                  }}
                  label="Correo electrónico"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <br />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="password"
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {typeRegister && <Button onClick={generatePassword}>Generar</Button>}
                        <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {typeRegister && (
              <>
                <br />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirmar contraseña"
                      type={showConfirmPassword ? 'text' : 'password'}
                      size="small"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </>
            )}
            <br />
            <Box>
              <LoadingButton
                fullWidth
                loading={loading || loadingRegister}
                variant="contained"
                onClick={handleSubmit(submitHandler)}
              >
                {typeRegister ? 'Registrar cuenta' : 'Iniciar Sesión'}
              </LoadingButton>
            </Box>
            <br />
            {!modal && (
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                {typeRegister ? (
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography>¿Quieres iniciar sesión? ¡Haz clic aquí!</Typography>
                  </Link>
                ) : (
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Typography>Registrar cuenta - ¡Haz clic aquí!</Typography>
                  </Link>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default LoginEndRegister;

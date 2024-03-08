import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import ImageIcon from '@mui/icons-material/Image';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { validationProducts } from 'src/validation/validationProduct';
import { useMutation } from '@apollo/client';
import CREATE_PRODUCT from 'src/graphql/mutations/products/createProduct';
import GET_INVENTORIES from 'src/graphql/querys/getInventories';

interface Props {
  show: boolean;
  handleClose: () => void;
  selecteProduct: any;
}

interface FormData {
  name: string;
  description: string;
  prices: number;
  image: string;
  quantity: number;
  sku: string;
  tax: boolean;
}

const defaultValues: FormData = {
  name: '',
  description: '',
  prices: 0,
  image: '',
  quantity: 0,
  sku: '',
  tax: false,
};



export default function CreateEndUpdate({ show, handleClose, selecteProduct }: Props) {
  const resolver = useMemo(() => yupResolver(validationProducts()), []);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>(null);
  const [errorImage, setErrorImage] = useState<string>('');

  const [createProduct, { loading: loadingCreate }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [GET_INVENTORIES],
    onCompleted: (data) => {
      const { createProduct = null } = data;
      if (createProduct?.success) {
        toast.success('Operación exitosa.');
        setTimeout(() => {
          handleCloseDialog();
        }, 1000);
      }
    },
    onError: (err) => {
      const message = err?.message ?? 'Algo salió mal, valué a intentarlo.';
      toast.error(message);
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver });

  const submitHandler = async (formData: FormData) => {
    if (!images) {
      setErrorImage('La foto del producto es requerido');
      return;
    }
    let urlImg: string = '';
    if (typeof images !== 'string') {
      setLoading(true);
      urlImg = await uploadCloudinary();
      setLoading(false);
    } else {
      urlImg = images;
    }
    try {
      await createProduct({
        variables: {
          ...formData,
          image: urlImg,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const hendleUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const size = file.size;
    if (size / 1024 > 500) {
      setErrorImage('El tamaño del archivo no debe ser mayor que el 500Kb');
    } else {
      setErrorImage('');
      setImages(file);
    }
  };

  const uploadCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', images);
    formData.append('upload_preset', 'bqvu6rdw');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/jehingson/image/upload',
        formData
      );
      return res?.data?.url ?? '';
    } catch (error) {
      setErrorImage('Error archivo o formato incorrecto!');
    }
    return '';
  };

  const removeImage = () => {
    setImages(null);
  };

  const handleCloseDialog = () => {
    reset({ ...defaultValues });
    removeImage()
    handleClose();
  };

  return (
    <Dialog open={show} fullWidth maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          <DialogTitle>
            {selecteProduct
              ? 'AGREGAR UN PRODUCTO'
              : `EDITAR EL PRODUCTO: ${selecteProduct?.name ?? ''}`}
          </DialogTitle>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} p={2} display="flex" justifyContent="center">
          {images ? (
            <Box>
              <Button onClick={removeImage} color="error" sx={{ cursor: 'pointer' }}>
                Remove
              </Button>
              <Box
                component="img"
                src={typeof images === 'string' ? images : URL.createObjectURL(images)}
                alt=""
                sx={{
                  width: 250,
                  border: '2px solid #00000019',
                  borderRadius: '5px',
                  padding: 2,
                  objectFit: 'contain',
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ImageIcon sx={{ fontSize: 40 }} color={errorImage ? 'error' : 'primary'} />
              <input
                type="file"
                name="file"
                id="file-up"
                accept="image/png,image/jpeg,image/jpg"
                onChange={hendleUpload}
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  zIndex: 10,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  opacity: 0,
                  height: 50,
                  width: '100%',
                }}
              />
              {errorImage && (
                <Typography variant="body2" color="error">
                  {errorImage}
                </Typography>
              )}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} p={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                onChange={(event) => {
                  field.onChange(event);
                }}
                label="Producto"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} px={2} py={1}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                onChange={(event) => {
                  field.onChange(event);
                }}
                label="Descripcion"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} pl={2} pr={1} py={2}>
          <Controller
            name="prices"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                onChange={(event) => {
                  field.onChange(event);
                }}
                label="Precio  $(USD)"
                error={!!errors.prices}
                helperText={errors.prices?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} pl={1} pr={2} py={2}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                onChange={(event) => {
                  field.onChange(event);
                }}
                label="Cantidad (unidad)"
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={6} pl={2} pr={1} py={1}>
          <Controller
            name="sku"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                onChange={(event) => {
                  event.target.value = event.target.value.toLowerCase().trim();
                  field.onChange(event);
                }}
                label="Sku"
                error={!!errors.sku}
                helperText={errors.sku?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} px={2} py={1}>
          <Controller
            name="tax"
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 5 }}>
                <Typography>Iva:</Typography>
                <Checkbox
                  {...field}
                  onChange={(event: any) => {
                    field.onChange(event);
                  }}
                />
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={12} py={2}>
          <Divider />
        </Grid>
        <Grid item xs={12} px={2} py={1} display="flex" justifyContent="end" gap={2}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleCloseDialog}
            disabled={loading || loadingCreate}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading || loadingCreate}
            variant="contained"
            onClick={handleSubmit(submitHandler)}
          >
            {true ? 'Guardar' : 'Editar'}
          </LoadingButton>
        </Grid>
      </Grid>
      <br />
    </Dialog>
  );
}

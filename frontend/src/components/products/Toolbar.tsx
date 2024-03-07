import { Button, Card, Grid } from '@mui/material';
import React from 'react';
import SearchGeneral from '../general/SeachGeneral';
import CreateEndUodate from './createEndUpdate';
import { setFilterInventory } from 'src/slices/products';
import { useDispatch, useSelector } from 'src/store';

interface Filter {
  inputValue: string;
  limit: number;
  offset: number;
}

interface Props {
  setShow: (value: boolean) => void;
}

export default function Toolbar({ setShow }: Props) {
  const dispatch = useDispatch();
  const { filterInventory: filter } = useSelector((store) => store.product_state);

  const handleSearchValueChange = (v: string) => {
    dispatch( setFilterInventory({ ...filter, inputValue: v, offset: 0 }));
  };

  return (
    <Card>
      <Grid container p={1}>
        <Grid item xs={12} md={4}>
          <SearchGeneral
            value={filter.inputValue}
            placeholder="Buscar Productos"
            handleSearchValueChange={handleSearchValueChange}
          />
        </Grid>
        <Grid item xs={12} md={5}></Grid>
        <Grid
          item
          xs={12}
          md={3}
          pt={{ xs: 2, md: 0 }}
          pr={{ xs: 0, md: 1 }}
          display="flex"
          justifyContent="end"
        >
          <Button variant="contained" onClick={() => setShow(true)}>
            Crear nuevo Producto
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

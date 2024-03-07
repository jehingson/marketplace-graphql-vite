import { Grid } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import RoleSales from '../roleSales';
import Wrapper from '../Wrapper';
import Toolbar from './Toolbar';
import { useState } from 'react';
import CreateEndUpdate from './createEndUpdate';
import Inventories from './inventories';

export default function Products() {
  const { user } = useAuth();
  const role = user?.role ?? '';
  const [show, setShow] = useState(false);
  const selecteProduct = {};


  if (role !== 'admin' && role !== 'sales') {
    return <RoleSales />;
  }

  return (
    <Wrapper title="Productos">
      <Grid container>
        <Grid item xs={12}>
          <Toolbar setShow={setShow} />
        </Grid>
        <Grid item xs={12} container>
          <Inventories /> 
        </Grid>
      </Grid>
      <CreateEndUpdate
        show={show}
        handleClose={() => setShow(false)}
        selecteProduct={selecteProduct}
      />
    </Wrapper>
  );
}

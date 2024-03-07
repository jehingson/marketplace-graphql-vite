import {
  Box,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Checkbox,
  Grid,
  Paper,
} from '@mui/material';
import PaginationGeneral from '@/components/general/PaginationGeneral';
import useInventories from 'src/hooks/useInvetories';
import { Product } from 'src/types/product';
import useAuth from 'src/hooks/useAuth';
import { useDispatch, useSelector } from 'src/store';
import { setFilterInventory } from 'src/slices/products';

export default function Inventories() {
  const dispatch = useDispatch()
  const { filterInventory: filter } = useSelector((store) => store.product_state)
  const { inventories, amount, loading } = useInventories();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handlePage = (value: number) => {
    dispatch(setFilterInventory({ ...filter, offset: value }))
  }

  const handleChangeRowsPerPage = (value: number) => {
    dispatch(setFilterInventory({ ...filter, limit: value }))
  }

  return (
    <>
      <Grid item xs={12} mt={1}>
        {loading ? <LinearProgress /> : <Box sx={{ border: '2px solid transparent' }} />}
        <TableContainer
          component={Paper}
          style={{ maxWidth: '100%', width: '100%', overflowX: 'auto' }}
        >
          <Table
            aria-label="collapsible table"
            sx={{
              '& .MuiTableCell-head': {
                color: 'textSecondary',
                fontWeight: 'bold',
                backgroundColor: 'primary.light',
              },
            }}
          >
            <TableHead>
              <TableRow>
                {isAdmin && <TableCell>Vendedor</TableCell>}
                <TableCell>Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Sku</TableCell>
                <TableCell>Iva</TableCell>
                <TableCell>Foto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventories.map((inventory: Product) => (
                <TableRow key={inventory.id} hover role="checkbox" tabIndex={-1}>
                  {isAdmin && <TableCell>{inventory?.account?.username ?? ''}</TableCell>}
                  <TableCell sx={{ p: 0 }}>
                    <Typography>{inventory.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    <Typography>{inventory.prices}</Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    <Typography>{inventory.quantity}</Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    <Typography>{inventory.sku}</Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    <Checkbox checked={inventory.tax} disabled />
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    <Box
                      component="img"
                      src={inventory?.image ?? '/photo.png'}
                      alt="photo"
                      sx={{ width: 50 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationGeneral 
              count={amount}
              rowsPerPage={filter.limit}
              page={filter.offset}
              onChangePage={handlePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
      </Grid>
    </>
  );
}

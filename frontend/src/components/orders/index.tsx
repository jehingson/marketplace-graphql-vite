import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useOrders from 'src/hooks/useOrders';
import { useSelector } from 'src/store';
import PaginationGeneral from '../general/PaginationGeneral';
import { formatNumberCurrency } from 'src/utils/calculatePricesTax';
import Wrapper from '../Wrapper';

export default function Orders() {
  const { filterOrders: filter } = useSelector((store) => store.product_state);
  const { orders, loading, amount } = useOrders(filter);
  const handlePage = () => {};

  const handleChangeRowsPerPage = () => {};

  return (
    <Wrapper title="Compras">
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
                <TableCell>Id</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>fecha</TableCell>
                <TableCell>Productos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: any) => {
                return (
                  <TableRow key={order.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell sx={{ p: 1 }}>
                      <Typography>{order.id}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Typography>{formatNumberCurrency(order.total)}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Typography>{order.createdAt}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0 }}>
                      {order.sales.map((sale: any) => (
                        <Chip key={sale.id} label={sale.product?.name} />
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Wrapper>
  );
}

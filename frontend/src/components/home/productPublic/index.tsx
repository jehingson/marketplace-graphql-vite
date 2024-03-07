import { Grid } from '@mui/material';
import { Product } from 'src/types/product';
import ItemProduct from './ItemProduct';
import { useState } from 'react';
import ViewProduct from './ViewProduct';
import PaginationGeneral from 'src/components/general/PaginationGeneral';
import { useDispatch } from 'src/store';
import { setAddCard, setFilterProductPublic } from 'src/slices/products';

interface Card {
  product: Product;
  quantity: number;
}

interface Filter {
  inputValue: string;
  limit: number;
  offset: number;
}

interface Props {
  products: Product[];
  amount: number;
  loading: boolean;
  filter: Filter;
  card: Card[] | null;
}

export default function ProductPublic({ card, products, amount, loading, filter }: Props) {
  const dispatch = useDispatch();
  const [selectProduct, setSelectProduct] = useState<Product | null>(null);

  const handlePage = (value: number) => {
    dispatch(setFilterProductPublic({ ...filter, offset: value }));
  };

  const handleChangeRowsPerPage = (value: number) => {
    dispatch(setFilterProductPublic({ ...filter, limit: value }));
  };

  const handleCardProduct = (value: { product: Product; quantity: number }) => {
    if (card && card.length > 0) {
      const cardExits = card.find((itm) => itm?.product?.id === value.product.id);
      if (cardExits) {
        const newCard = card.map((itm) => {
          return {
            ...itm,
            quantity:
              itm.product.id === value.product.id ? itm.quantity + value.quantity : itm.quantity,
          };
        });
        dispatch(setAddCard(newCard));
      } else {
        dispatch(setAddCard([...card, value]));
      }
    } else {
      dispatch(setAddCard([value]));
    }
  };

  return (
    <Grid container>
      <PaginationGeneral
        count={amount}
        rowsPerPage={filter.limit}
        page={filter.offset}
        onChangePage={handlePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsActive={false}
      />
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} p={1}>
          <ItemProduct
            product={product}
            setSelectProduct={setSelectProduct}
            handleCardProduct={handleCardProduct}
          />
        </Grid>
      ))}
      <PaginationGeneral
        count={amount}
        rowsPerPage={filter.limit}
        page={filter.offset}
        onChangePage={handlePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsActive={false}
      />
      <ViewProduct 
        selectProduct={selectProduct} 
        setSelectProduct={setSelectProduct}
        handleCardProduct={handleCardProduct} 
      />
    </Grid>
  );
}

import { Grid } from '@mui/material';
import { Product } from 'src/types/product';
import ItemProduct from './ItemProduct';
import { useState } from 'react';
import ViewProduct from './ViewProduct';


interface Props {
  products: Product[];
  loading: boolean;
}

export default function ProductPublic({ products, loading }: Props) {
  const [selectProduct, setSelectProduct] = useState<Product | null>(null);

  return (
    <Grid container>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} p={1}>
          <ItemProduct product={product} setSelectProduct={setSelectProduct} />
        </Grid>
      ))}
      <ViewProduct selectProduct={selectProduct} setSelectProduct={setSelectProduct} />
    </Grid>
  );
}

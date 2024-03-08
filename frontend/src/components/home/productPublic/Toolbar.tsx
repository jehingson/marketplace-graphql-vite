import { Card, Grid } from '@mui/material';
import RangeSlider from 'src/components/RangeSlider';
import SearchGeneral from 'src/components/general/SeachGeneral';
import { setFilterProductPublic } from 'src/slices/products';
import { useDispatch } from 'src/store';

export default function Toolbar({ filter }: any) {
  const dispatch = useDispatch();
  const handleSearchValueChange = (v: string) => {
    dispatch(setFilterProductPublic({ ...filter, inputValue: v, offset: 0 }));
  };
  
  return (
    <Card>
      <Grid container p={1}>
        <Grid item xs={12} md={4} mt={2}>
          <SearchGeneral
            value={filter.inputValue}
            placeholder="Buscar por nombre o sku"
            handleSearchValueChange={handleSearchValueChange }
          />
        </Grid>
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={4}>
          <RangeSlider />
        </Grid>
      </Grid>
    </Card>
  );
}

import { Box, Slider, Typography } from "@mui/material";
import { setRange } from "src/slices/products";
import { useDispatch, useSelector } from "src/store";


const RangeSlider = () => {
  const dispatch = useDispatch()
  const { range } = useSelector((store) => store.product_state)
  const handleChange = (event, newValue: any) => {
    setTimeout(() => {
      dispatch(setRange(newValue))
    }, 100)
  };

  return (
    <Box style={{ margin: 'auto' }}>
      <Typography id="range-slider" gutterBottom>
        Rango de Precios:
      </Typography>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={3000}
      />
    </Box>
  );
};

export default RangeSlider;
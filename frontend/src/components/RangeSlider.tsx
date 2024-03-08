import { Box, Slider, Typography } from "@mui/material";
import { setRange } from "src/slices/products";
import { useDispatch, useSelector } from "src/store";


const RangeSlider = () => {
  const dispatch = useDispatch()
  const { range } = useSelector((store) => store.product_state)
  const handleChange = (event: any, newValue: any) => {
    setTimeout(() => {
      dispatch(setRange(newValue))
    }, 100)
  };

  return (
    <Box sx={{ margin: 'auto', width: "90%", position: "relative", pb: 3, mt: { xs: 2, md: 0 } }}>
      <Typography id="range-slider" variant="body2" fontWeight="300" color="textScondary">
        Rango de Precios:
      </Typography>
      <Slider
        sx={{ position: "absolute", zIndex: 99 }}
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={1}
        max={3000}
      />
    </Box>
  );
};

export default RangeSlider;
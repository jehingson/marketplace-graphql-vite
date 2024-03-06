import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

export default function ItemProducts({
  img,
  title,
  reviews,
  prevPrice,
  newPrice,
  company,
  color,
  category,
}: any) {
  return (
    <Grid item xs={6} md={4} lg={3} key={title}>
      <Box
        display="flex"
        flexDirection="column"
        m={4}
        sx={{ border: "1px solid default" }}
        bgcolor="red"
      >
        <CardMedia 
          component="img" 
          alt={title} 
          image={img} 
          height={130} 
          sx={{
             objectFit: "cover",
             width: "100%",
          }}
        />
        <CardContent>
          <Typography>{title}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Precios: ${newPrice}
          </Typography>
        </CardContent>
      </Box>
    </Grid>
  );
}

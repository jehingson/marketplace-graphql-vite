import React from "react";
import ItemProducts from "./ItemProducts";
import data from "src/db/data";
import { Card, Grid } from "@mui/material";

export default function Products() {
  return (
    <Grid container>
      {data.map((product) => (
        <ItemProducts {...product} />
      ))}
    </Grid>
  );
}

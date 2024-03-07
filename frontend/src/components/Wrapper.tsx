import { Grid, Typography } from '@mui/material'
import React from 'react'


const Wrapper = ({ children, title }: { children: React.ReactNode, title: string}) => {
  return (
    <Grid container my={1} mb={2}>
      <Grid
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1"
        container
      >
        <Grid item>
          <Typography color="textPrimary" variant="h4">{title}</Typography>
        </Grid>
      </Grid>
      {children}
    </Grid>
  )
}

export default Wrapper
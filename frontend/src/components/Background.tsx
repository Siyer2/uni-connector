import React from 'react';
import { Grid, Paper } from '@mui/material';

type backgroundProps = {
  children: React.ReactNode;
};
const Background = (props: backgroundProps) => {
  return (
    <Grid
      container
      component={Paper}
      sx={{
        width: '100vw',
        height: '100vh',
      }}
      textAlign={'center'}
      display={'flex'}
    >
      {props.children}
    </Grid>
  );
};

export default Background;

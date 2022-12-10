import React from 'react';
import { Grid } from '@mui/material';

type backgroundProps = {
  children: React.ReactNode;
  bgcolor: string;
};

const Background = (props: backgroundProps) => {
  return (
    <Grid
      container
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: props.bgcolor,
      }}
      textAlign={'center'}
      display={'flex'}
    >
      {props.children}
    </Grid>
  );
};

export default Background;

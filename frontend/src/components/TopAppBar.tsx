import { Box, AppBar, Toolbar, IconButton, Grid } from '@mui/material';
import { SignOutButton } from './SignOutButton';
import beanWave from '../assets/bean-wave.gif';

const TopAppBar = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={beanWave} alt="queen" height="40" width="40" />
          </IconButton>
          <Box display="flex" flexGrow={1}></Box>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Grid
        container
        sx={{
          width: '100vw',
          height: 'calc(100vh - 64px)',
        }}
        textAlign={'center'}
      >
        {props.children}
      </Grid>
    </>
  );
};

export default TopAppBar;

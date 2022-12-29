import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { SignOutButton } from './SignOutButton';
import beanWave from '../assets/bean-wave.gif';
import Background from './Background';

const TopAppBar = (props: { children: React.ReactNode }) => {
  return (
    <Background bgcolor="#fff">
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

      {props.children}
    </Background>
  );
};

export default TopAppBar;

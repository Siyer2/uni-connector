import { Box, AppBar, Toolbar } from '@mui/material';
import { SignOutButton } from './SignOutButton';

export const TopAppBar = (props: { children: JSX.Element }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1}></Box>
          <SignOutButton />
        </Toolbar>
      </AppBar>

      {props.children}
    </>
  );
};

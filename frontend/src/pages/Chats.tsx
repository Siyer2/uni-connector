import { Box, AppBar, Toolbar } from '@mui/material';
import { SignOutButton } from '../components/SignOutButton';

export const Chats = () => {
  return (
    <div>
      <Box>This is the Chats Page!</Box>
      <ButtonAppBar />
    </div>
  );
};

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}></Box>
        <SignOutButton />
      </Toolbar>
    </AppBar>
  );
}

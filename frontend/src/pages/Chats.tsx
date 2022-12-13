import { TopAppBar } from '../components/TopAppBar';
import Background from '../components/Background';
import { Grid } from '@mui/material';

export const Chats = () => {
  return (
    <Background bgcolor="#fff">
      <Grid item xs={12}>
        <TopAppBar>
          <div>Chat Messages content</div>
        </TopAppBar>
      </Grid>
    </Background>
  );
};

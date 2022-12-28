import { PageLayout } from '../components/PageLayout';
import Background from '../components/Background';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileContent } from '../components/ProfileContent';
import { Grid, Typography } from '@mui/material';
import beanWave from '../assets/bean-wave.gif';

export const HomePage = () => {
  return (
    <Background bgcolor={'background.default'}>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign={'center'} color="#fff">
          <img src={beanWave} alt="bean" height="40" width="40" /> <br />
          TuesHey
        </Typography>
        <Typography
          variant="h6"
          textAlign={'center'}
          color="#fff"
          mb={5}
          mx={10}
        >
          Connect with a UNSW student/alumni not in your faculty!
          <br />
          <br />
          Every Tuesday
        </Typography>

        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </Grid>
    </Background>
  );
};

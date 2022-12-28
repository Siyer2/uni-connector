import Background from '../components/Background';
import { Grid, Typography } from '@mui/material';
import beanWave from '../assets/bean-wave.gif';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from '../components/SignOutButton';
import { useEffect } from 'react';
import { requestMSAuthResult } from '../functions/requestMSAuthResult';

export const HomePage = () => {
  const { accounts, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    async function signInSignUp() {
      const response = await requestMSAuthResult(instance, accounts[0]);
      console.log('logging in', response.idToken);

      // TODO: Make request to /userLoginSignup using response.idToken

      // TODO: Redirect to /updateUser if user is new else redirect to /chats
      // Note: if a user has an empty faculty, they are new (until we add the backend call, simply use a const user = ...)
    }

    if (isAuthenticated) {
      signInSignUp();
    }
  }, [accounts, instance, isAuthenticated]);

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

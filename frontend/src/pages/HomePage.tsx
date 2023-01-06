import { Grid, Typography } from '@mui/material';
import beanWave from '../assets/bean-wave.gif';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from '../components/SignOutButton';
import { useEffect } from 'react';
import { requestMSAuthResult } from '../functions/requestMSAuthResult';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

export const HomePage = () => {
  const { accounts, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    async function signInSignUp() {
      const response = await requestMSAuthResult(instance, accounts[0]);
      console.log('logging in', response.idToken);

      try {
        const user = await loginUser(response.idToken);
        console.log(user);
        user.faculty ? navigate('/chats') : navigate('/update-user');
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    if (isAuthenticated) {
      signInSignUp();
    }
  }, [accounts, instance, isAuthenticated, navigate]);

  return (
    <Grid
      container
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'background.default',
      }}
      textAlign={'center'}
      display={'flex'}
    >
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
    </Grid>
  );
};

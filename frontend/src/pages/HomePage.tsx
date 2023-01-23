import {
  Grid,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  AlertTitle,
} from '@mui/material';
import beanWave from '../assets/bean-wave.gif';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from '../components/SignOutButton';
import { useEffect, useState } from 'react';
import { requestMSAuthResult } from '../functions/requestMSAuthResult';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

export const HomePage = () => {
  const { accounts, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const name = accounts[0] && accounts[0].name;

  useEffect(() => {
    async function signInSignUp() {
      const isValidEmail =
        /^[A-Za-z0-9._%+-]+@(unsw.edu.au|unswalumni.com|ad.unsw.edu.au|zmail.unsw.edu.au|student.unsw.edu.au)$/.test(
          accounts[0].username
        );

      if (isValidEmail || process.env.REACT_APP_DEPLOYMENT === 'local') {
        const response = await requestMSAuthResult(instance, accounts[0]);
        console.log('logging in', response.idToken);

        try {
          setLoading(true);
          const user = await loginUser(response.idToken);
          setLoading(false);
          user.faculty
            ? navigate('/chats')
            : navigate('/update-user', { state: { user } });
        } catch (err: any) {
          setLoading(false);
          if (err.response) {
            setLoginErrorMsg(err.response.data);
            setOpen(true);
          } else {
            setLoginErrorMsg(`Error: ${err.message}`);
            setOpen(true);
          }
        }
      } else {
        setLoginErrorMsg('Please input a valid UNSW email.');
        setOpen(true);
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        {loginErrorMsg ? (
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: '100%' }}
            variant="filled"
          >
            <AlertTitle>Error</AlertTitle>
            {loginErrorMsg}
          </Alert>
        ) : (
          <></>
        )}
      </Snackbar>
    </Grid>
  );
};

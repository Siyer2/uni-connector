import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { requestMSAuthResult } from '../functions/requestMSAuthResult';
import { Alert, AlertTitle } from '@mui/material';

export const ProfileContent = () => {
  const { accounts, instance } = useMsal();
  const name = accounts[0] && accounts[0].name;
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      // Make sure that the user's email is a UNSW or UNSW Alumni email
      // The user's email is accounts[0].username
      // If not a valid email, don't log the user in
      const isValidEmail =
        /^[A-Za-z0-9._%+-]+@(unsw.edu.au|unswalumni.com|ad.unsw.edu.au|zmail.unsw.edu.au|student.unsw.edu.au)$/.test(
          accounts[0].username
        );

      if (isValidEmail) {
        const response = await requestMSAuthResult(instance, accounts[0]);
        // Use the idToken to make verified calls
        console.log('logging in', response.idToken);
      } else {
        setErrorMessage('Please log out and log in with a valid UNSW email');
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {errorMessage ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      ) : (
        <h5 className="card-title">Welcome {name}</h5>
      )}
    </>
  );
};

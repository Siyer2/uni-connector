import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { IPublicClientApplication } from '@azure/msal-browser';
import { Button } from '@mui/material';
import { useState } from 'react';

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(instance: IPublicClientApplication) {
    try {
      setIsLoading(true);
      await instance.loginPopup(loginRequest);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outlined"
      className="ml-auto"
      onClick={() => handleLogin(instance)}
      disabled={isLoading}
    >
      Sign in with UNSW email
    </Button>
  );
};

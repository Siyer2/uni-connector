import { useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';
import { IPublicClientApplication } from '@azure/msal-browser';

function handleLogout(instance: IPublicClientApplication) {
  instance.logoutRedirect().catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      variant="contained"
      className="ml-auto"
      size="large"
      sx={{ mx: 'auto' }}
      color="secondary"
      onClick={() => handleLogout(instance)}
    >
      Sign out
    </Button>
  );
};

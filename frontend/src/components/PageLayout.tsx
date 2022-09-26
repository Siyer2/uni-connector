import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: { children: JSX.Element }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}

      {props.children}
    </>
  );
};

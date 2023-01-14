import { useIsAuthenticated } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  return <> {isAuthenticated ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;

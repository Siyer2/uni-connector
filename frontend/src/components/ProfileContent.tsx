import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { requestMSAuthResult } from '../functions/requestMSAuthResult';

export const ProfileContent = () => {
  const { accounts, instance } = useMsal();
  const name = accounts[0] && accounts[0].name;

  useEffect(() => {
    async function fetchData() {
      const response = await requestMSAuthResult(instance, accounts[0]);

      // Use the idToken to make verified calls
      console.log('logging in', response.idToken);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
    </>
  );
};

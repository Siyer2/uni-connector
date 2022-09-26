import {
  AccountInfo,
  AuthenticationResult,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { loginRequest } from '../authConfig';

export async function requestMSAuthResult(
  instance: IPublicClientApplication,
  account: AccountInfo
): Promise<AuthenticationResult> {
  const request = {
    ...loginRequest,
    account,
  };

  // Silently acquires an access token which is then attached to a request for Microsoft Graph data
  try {
    const response = await instance.acquireTokenSilent(request);
    return response;
  } catch (error) {
    console.log('failed to login', error);
    throw new Error('failed to login');
  }
}

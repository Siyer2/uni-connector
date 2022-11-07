import { DynamoDB } from 'aws-sdk';

export interface Key {
  kty: string;
  use: string;
  kid: string;
  x5t: string;
  n: string;
  e: string;
  x5c: [string];
  issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0';
}

export type MicrosoftUser = {
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  name: string;
  nonce: string;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  uti: string;
  ver: string;
};

declare global {
  namespace Express {
    interface Request {
      user: MicrosoftUser;
      db: DynamoDB.DocumentClient;
    }
  }
}

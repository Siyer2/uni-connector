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

declare global {
  namespace Express {
    interface Request {
      user: any; //TODO: Add user type
      db: DynamoDB.DocumentClient;
    }
  }
}

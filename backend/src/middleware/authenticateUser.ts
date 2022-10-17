import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import axios from 'axios';

declare global {
  namespace Express {
    interface Request {
      user: any; //TODO: Add user type
    }
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({ error: 'MISSING_AUTH' });
    }

    const splitBearerToken = bearerToken.split('Bearer ');
    const idToken = splitBearerToken[1];
    if (!idToken) {
      return res.status(401).json({ error: 'MISSING_ID_TOKEN' });
    }

    const decodedIdToken = decode(idToken, { complete: true });
    const kid = decodedIdToken.header.kid;
    if (!kid) {
      return res.status(401).json({ error: 'INVALID_ID_TOKEN' });
    }

    const msKeys = await axios.get(
      'https://login.microsoftonline.com/common/discovery/v2.0/keys'
    );
    const keys = msKeys.data.keys as Key[];
    const keyToUse = keys.find((key) => key.kid === kid);

    const certificate = `-----BEGIN CERTIFICATE-----\n${keyToUse.x5c[0]}\n-----END CERTIFICATE-----`;

    const user = verify(idToken, certificate);
    req.user = user;

    next();
  } catch (error) {
    console.log('failed to authenticate user', error);
    return res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
  }
}

interface Key {
  kty: string;
  use: string;
  kid: string;
  x5t: string;
  n: string;
  e: string;
  x5c: [string];
  issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0';
}

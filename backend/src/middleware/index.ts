import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { Key } from './types';
import { DynamoDB } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env.local' });

let db: DynamoDB.DocumentClient = null;

export const middleware = {
  authenticateUser: async function (
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
  },
  getDB: function (req: Request, res: Response, next: NextFunction) {
    if (db) {
      return db;
    }

    let dbConfig: DynamoDB.ClientConfiguration = {
      region: 'ap-southeast-2',
    };

    if (process.env.ENVIRONMENT === 'local') {
      dbConfig = {
        region: 'us-east-1',
        endpoint: 'http://localhost:8000',
        credentials: {
          accessKeyId: 'localKey',
          secretAccessKey: 'localSecret',
        },
      };
    }

    const docClient = new DynamoDB.DocumentClient(dbConfig);

    req.db = docClient;
    next();
  },
};

import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { middleware } from './middleware';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Faculty, User } from './user/types';
import { getUser, updateUser } from './user';

dotenv.config({ path: __dirname + '/../.env.local' });
const app = express();

// CORS
const allowlist =
  process.env.ENVIRONMENT === 'local'
    ? ['http://localhost:3001']
    : ['https://main.d2dflf7eo6e40g.amplifyapp.com/'];
const options: cors.CorsOptions = {
  origin: allowlist,
};
app.use(cors(options));
app.use(express.json());

// Routes
/**
 * Endpoint to update a user's profile
 */
app.post(
  '/updateUser',
  [middleware.authenticateUser, middleware.getDB],
  async (req: express.Request, res: express.Response) => {
    // Ensure that faculty is provided and is a valid faculty
    if (
      typeof req.body.faculty !== 'string' ||
      !Object.values(Faculty).includes(req.body.faculty)
    ) {
      return res.status(400).json({
        error: 'INVALID_FACULTY',
        message: 'Faculty is required body param',
      });
    }

    // Construct the updated user
    const updatedUser: User = {
      primaryKey: `USER#${req.user.oid}`,
      sortKey: `METADATA#${req.user.oid}`,
      ...req.body,
    };

    // Update it in the database
    await updateUser(req.db, updatedUser);

    // Get the updated user from the database
    const user = await getUser(req.db, req.user.oid);

    // Return it
    return res.json(user);
  }
);

/**
 * User sign up/sign in
 */
app.post(
  '/userLoginSignup',
  [middleware.authenticateUser, middleware.getDB],
  async (req: express.Request, res: express.Response) => {
    // search for existing user
    const user = await getUser(req.db, req.user.oid);

    // create if not found
    if (Object.keys(user).length === 0) {
      const newUser: User = {
        primaryKey: `USER#${req.user.oid}`,
        sortKey: `METADATA#${req.user.oid}`,
        ...req.body,
      };
      await updateUser(req.db, newUser);

      return await getUser(req.db, req.user.oid);
    }

    // return user data
    return res.json(user);
  }
);

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).send('An internal server error occurred');
  }
);

module.exports = app;

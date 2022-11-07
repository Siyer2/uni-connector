import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { middleware } from './middleware';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

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
app.get(
  '/',
  [middleware.authenticateUser, middleware.getDB],
  async (req: express.Request, res: express.Response) => {
    const params: DocumentClient.QueryInput = {
      TableName: 'User',
      KeyConditionExpression: 'id = :value',
      ExpressionAttributeValues: {
        ':value': req.user.oid,
      },
    };

    const userInDb = await req.db.query(params).promise();
    console.log(userInDb);
    res.send(`Request received: ${req.method} - ${req.path}`);
  }
);

/**
 * Endpoint to update a user's profile
 */
app.post(
  '/updateUser',
  [middleware.authenticateUser, middleware.getDB],
  async (req: express.Request, res: express.Response) => {
    // Ensure that faculty is provided
    if (typeof req.body.faculty !== 'string') {
      res.status(400).json({
        error: 'MISSING_FACULTY',
        message: 'Faculty is required body param',
      });
    }

    // Construct the updated user
    const updatedUser = {
      id: req.user.oid,
      ...req.body,
    };

    const params: DocumentClient.PutItemInput = {
      TableName: 'User',
      Item: updatedUser,
    };

    // Update it in the database
    await req.db.put(params).promise();

    // Get the updated user from the database
    const user = await req.db
      .get({
        TableName: 'User',
        Key: {
          id: req.user.oid,
        },
      })
      .promise();

    // Return it
    res.json(user.Item);
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

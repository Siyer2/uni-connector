import * as express from 'express';
import { authenticateUser } from './middleware/authenticateUser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

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
app.get('/', authenticateUser, (req, res) => {
  console.log(__dirname);
  console.log(process.env.ENVIRONMENT);
  console.log(req.user);
  res.send(`Request received: ${req.method} - ${req.path}`);
});

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

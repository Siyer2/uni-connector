import * as express from 'express';
import { authenticateUser } from './middleware/authenticateUser';
import * as cors from 'cors';

const app = express();

// CORS
const allowlist = ['http://localhost:3001'];
const options: cors.CorsOptions = {
  origin: allowlist,
};
app.use(cors(options));
app.use(express.json());

// Routes
app.get('/', authenticateUser, (req, res) => {
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

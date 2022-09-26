import * as express from 'express';
import { authenticateUser } from './middleware/authenticateUser';

const app = express();

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

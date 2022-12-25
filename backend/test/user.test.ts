import { Server } from 'http';
const app = require('../src/app');

describe('User Tests', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(process.env.PORT);
  });

  afterAll(() => {
    server.close();
  });

  it('Update user', async function () {});
});

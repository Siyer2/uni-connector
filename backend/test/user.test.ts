import { NextFunction, Request, Response } from 'express';
import supertest from 'supertest';
import { MicrosoftUser } from '../src/middleware/types';
import { Faculty, User } from '../src/user/types';
const app = require('../src/app');

const mockUserFromMiddleware: MicrosoftUser = {
  iss: '',
  iat: 0,
  nbf: 0,
  exp: 0,
  name: 'John Smith',
  nonce: '',
  oid: '81f3816a-edb5-4352-9f9a-953f23d2f7c1',
  preferred_username: 'john@ad.unsw.edu.au',
  rh: '',
  sub: '',
  tid: '',
  uti: '',
  ver: '',
};
const mockUser: User = {
  name: 'John Smith',
  sortKey: 'METADATA#81f3816a-edb5-4352-9f9a-953f23d2f7c1',
  primaryKey: 'USER#81f3816a-edb5-4352-9f9a-953f23d2f7c1',
  type: 'user',
};

jest.mock('../src/middleware/index.ts', () => ({
  middleware: {
    authenticateUser: (req: Request, _: Response, next: NextFunction) => {
      req.user = mockUserFromMiddleware;
      next();
    },
    getDB: (_: Request, __: Response, next: NextFunction) => next(),
  },
}));

const request = supertest(app);
describe('/userLoginSignup tests', () => {
  beforeEach(() => jest.clearAllMocks());

  it('non-existing user calling /userLoginSignup should create a new user', async () => {
    // Mock getUser to return null on the first call and the mockUser on the second call
    const getUser = jest.spyOn(require('../src/user/index.ts'), 'getUser');
    getUser.mockImplementation(async () => {
      if (getUser.mock.calls.length === 1) {
        return null;
      } else {
        return mockUser;
      }
    });

    // Mock updateUser to successfully return
    const updateUser = jest.spyOn(
      require('../src/user/index.ts'),
      'updateUser'
    );
    updateUser.mockImplementation(async () => {});

    // Make request
    const res = await request.post('/userLoginSignup');

    // Expect a 200 status code
    expect(res.status).toEqual(200);

    // Expect the mockUser to be returned
    expect(res.body).toEqual(mockUser);

    // Expect updateUser to be called once
    expect(updateUser).toHaveBeenCalledTimes(1);
  });

  it('existing user calling /userLoginSignup should return the user', async () => {
    // Mock getUser to return the mockUser
    const getUser = jest.spyOn(require('../src/user/index.ts'), 'getUser');
    getUser.mockImplementation(async () => mockUser);

    const updateUser = jest.spyOn(
      require('../src/user/index.ts'),
      'updateUser'
    );

    // Make request
    const res = await request.post('/userLoginSignup');

    // Expect a 200 status code
    expect(res.status).toEqual(200);

    // Expect the mockUser to be returned
    expect(res.body).toEqual(mockUser);

    // Expect updateUser to not be called
    expect(updateUser).not.toHaveBeenCalled();
  });
});

describe('/updateUser tests', () => {
  beforeEach(() => jest.clearAllMocks());
  describe('invalid faculty should return error', () => {
    const updateUser = jest.spyOn(
      require('../src/user/index.ts'),
      'updateUser'
    );
    updateUser.mockImplementation(async () => {});

    it('empty faculty', async () => {
      const res = await request.post('/updateUser').send({ faculty: '' });
      expect(res.status).toEqual(400);
      expect(updateUser).not.toHaveBeenCalled();
    });
    it('invalid faculty', async () => {
      const res = await request
        .post('/updateUser')
        .send({ faculty: 'ergbeigbrt' });
      expect(res.status).toEqual(400);
      expect(updateUser).not.toHaveBeenCalled();
    });
  });

  it('user should be returned', async () => {
    // Mock getUser to return the mockUser
    const getUser = jest.spyOn(require('../src/user/index.ts'), 'getUser');
    const updatedUser: User = {
      ...mockUser,
      faculty: Faculty.Science,
    };
    getUser.mockImplementation(async () => updatedUser);
    // Mock updateUser to return
    const updateUser = jest.spyOn(
      require('../src/user/index.ts'),
      'updateUser'
    );
    updateUser.mockImplementation(async () => {});

    const res = await request
      .post('/updateUser')
      .send({ faculty: Faculty.Science });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(updatedUser);
    expect(res.body.faculty).toBe(Faculty.Science);
    expect(updateUser).toHaveBeenCalled();
  });
});

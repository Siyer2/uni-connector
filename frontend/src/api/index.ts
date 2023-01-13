import { User } from '../types';
import http from '../http';

export async function loginUser(token: string): Promise<User> {
  const res = await http.post('/userLoginSignup', undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = res.data as User;
  return user;
}

export async function updateUser(token: string, userInfo: any): Promise<User> {
  const res = await http.post('/updateUser', userInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = res.data as User;
  return user;
}

import { User, UserDetails } from '../types';
import http from '../http';
import { getToken } from '../localStorage';

export async function loginUser(token: string): Promise<User> {
  const res = await http.post('/userLoginSignup', undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = res.data as User;
  return user;
}

export async function updateUser(userDetails: UserDetails): Promise<User> {
  const token = getToken();
  const res = await http.post('/updateUser', userDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = res.data as User;
  return user;
}

const tokenKey = 'idToken';

function persistToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

function getToken(): string {
  return localStorage.getItem(tokenKey) || '';
}

export { persistToken, getToken };

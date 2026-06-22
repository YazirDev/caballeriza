const TOKEN_KEY = "caballeriza_token";
const USER_KEY = "caballeriza_user";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const rawUser = localStorage.getItem(USER_KEY);
  return rawUser ? JSON.parse(rawUser) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuthStorage() {
  removeToken();
  removeUser();
}
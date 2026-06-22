import api from "./axiosConfig";

export async function loginRequest(credentials) {
  const { data } = await api.post("/auth/login", {
    username: credentials.username || credentials.email,
    password: credentials.password,
  });

  return data;
}

export async function registerRequest(payload) {
  const { data } = await api.post("/auth/register", {
    username: payload.username,
    password: payload.password,
    email: payload.email,
    rol: payload.rol || payload.role,
  });

  return data;
}
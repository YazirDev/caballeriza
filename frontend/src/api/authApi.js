import api from "./axiosConfig";

export async function loginRequest(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function registerRequest(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function getCurrentUserRequest() {
  const { data } = await api.get("/users/me");
  return data;
}
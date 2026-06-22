import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../api/authApi";
import { clearAuthStorage, getToken, getUser, saveToken, saveUser } from "./authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const isAuthenticated = Boolean(token);

  async function login(credentials) {
    const response = await loginRequest(credentials);
    const jwt = response.token || response.accessToken || response.jwt;
    const userData = response.user || response.usuario || {
      username: credentials.username || credentials.email,
      email: credentials.email || "",
      rol: response.rol || response.role || "ADMINISTRADOR",
    };

    if (!jwt) {
      throw new Error("El backend no devolvió token JWT");
    }

    saveToken(jwt);
    saveUser(userData);
    setToken(jwt);
    setUser(userData);

    return response;
  }

  async function register(payload) {
    return registerRequest(payload);
  }

  function logout() {
    clearAuthStorage();
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [token, user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
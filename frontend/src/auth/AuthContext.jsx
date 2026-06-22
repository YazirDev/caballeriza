import { createContext, useContext, useMemo, useState } from "react";
import { authApi } from "../api/authApi";
import { getToken, getUser, removeSession, saveSession } from "./authStorage";

const AuthContext = createContext(null);

const normalizeLoginResponse = (data) => {
  const token = data?.token || data?.jwt || data?.accessToken;
  const user = data?.user || data?.usuario || {
    id: data?.id,
    nombre: data?.nombre || data?.name,
    email: data?.email,
    rol: data?.rol || data?.role
  };

  return { token, user };
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  const login = async (credentials) => {
    setLoading(true);

    try {
      const data = await authApi.login(credentials);
      const session = normalizeLoginResponse(data);

      if (!session.token) {
        throw new Error("El backend no devolvió token.");
      }

      saveSession(session.token, session.user);
      setToken(session.token);
      setUser(session.user);

      return session;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);

    try {
      return await authApi.register(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeSession();
    setToken(null);
    setUser(null);
  };

  const hasRole = (roles = []) => {
    if (!user?.rol && !user?.role) {
      return false;
    }

    const currentRole = user.rol || user.role;
    return roles.includes(currentRole);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      hasRole
    }),
    [token, user, loading, isAuthenticated]
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
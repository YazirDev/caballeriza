import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RoleRoute({ roles = [], children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const currentRole = user?.rol || user?.role;

  if (!roles.includes(currentRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children || <Outlet />;
}
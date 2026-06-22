import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import HorsesPage from "../pages/HorsesPage";
import HorseDetailPage from "../pages/HorseDetailPage";
import StaffPage from "../pages/StaffPage";
import StaffDetailPage from "../pages/StaffDetailPage";
import ReservationsPage from "../pages/ReservationsPage";
import FeedingPage from "../pages/FeedingPage";
import InventoryPage from "../pages/InventoryPage";
import AlertsPage from "../pages/AlertsPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProtectedRoute from "../auth/ProtectedRoute";
import RoleRoute from "../auth/RoleRoute";
import AppNavbar from "../components/layout/AppNavbar";
import Sidebar from "../components/layout/Sidebar";

function PrivateLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <AppNavbar />
        <section className="app-content">{children}</section>

        <footer className="app-footer">
          © 2024 Sistema de Gestión de Caballeriza. Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <DashboardPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/horses"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <HorsesPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/horses/:id"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <HorseDetailPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <RoleRoute allowedRoles={["ADMINISTRADOR", "ADMIN"]}>
            <PrivateLayout>
              <StaffPage />
            </PrivateLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/staff/:id"
        element={
          <RoleRoute allowedRoles={["ADMINISTRADOR", "ADMIN"]}>
            <PrivateLayout>
              <StaffDetailPage />
            </PrivateLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <ReservationsPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/feeding"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <FeedingPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <InventoryPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <AlertsPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
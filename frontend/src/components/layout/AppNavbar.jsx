import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function AppNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || user?.nombre || user?.email || "Usuario";
  const userRole = user?.role || user?.rol || "Usuario";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="app-navbar">
      <div>
        <h6 className="mb-0 fw-bold">Sistema de Gestión de Caballeriza</h6>
        <small className="text-muted">Panel administrativo</small>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Button
          variant="light"
          className="position-relative rounded-circle border"
          size="sm"
          onClick={() => navigate("/alerts")}
        >
          <i className="bi bi-bell"></i>
          <span className="notification-dot"></span>
        </Button>

        <Dropdown align="end">
          <Dropdown.Toggle variant="light" className="border user-dropdown">
            <div className="d-flex align-items-center gap-2">
              <div className="avatar-circle">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className="text-start d-none d-md-block">
                <div className="small fw-semibold">{userName}</div>
                <div className="tiny text-muted">{userRole}</div>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/dashboard")}>
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="text-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Cerrar sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
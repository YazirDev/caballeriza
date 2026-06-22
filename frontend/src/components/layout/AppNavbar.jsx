import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to={isAuthenticated ? "/dashboard" : "/login"}>
          Caballeriza
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {isAuthenticated && (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>

              <Nav.Link as={NavLink} to="/caballos">
                Caballos
              </Nav.Link>

              <Nav.Link as={NavLink} to="/personal">
                Personal
              </Nav.Link>

              <Nav.Link as={NavLink} to="/reservas">
                Reservas
              </Nav.Link>

              <Nav.Link as={NavLink} to="/alimentacion">
                Alimentación
              </Nav.Link>

              <Nav.Link as={NavLink} to="/inventario">
                Inventario
              </Nav.Link>

              <Nav.Link as={NavLink} to="/alertas">
                Alertas
              </Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto">
            {isAuthenticated ? (
              <NavDropdown
                title={user?.nombre || user?.name || user?.email || "Usuario"}
                align="end"
              >
                <NavDropdown.ItemText>
                  <div className="small text-muted">Rol</div>
                  <strong>{user?.rol || user?.role || "Sin rol"}</strong>
                </NavDropdown.ItemText>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Iniciar sesión
                </Nav.Link>

                <Nav.Link as={NavLink} to="/register">
                  Registro
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
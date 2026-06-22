import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    rol: "CLIENTE",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <nav className="auth-navbar">
        <Link to="/login" className="auth-brand">
          <span className="brand-icon">
            <i className="bi bi-lightning-charge-fill"></i>
          </span>
          Sistema de Gestión de Caballeriza
        </Link>

        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-link text-dark text-decoration-none">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-primary-custom">
            Registrarse
          </Link>
        </div>
      </nav>

      <section className="auth-content">
        <Card className="auth-card register-card">
          <Card.Body>
            <h1>Crear Cuenta</h1>
            <p>Registra tus datos para comenzar a gestionar la caballeriza.</p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="admin1"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@caballeriza.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select name="rol" value={form.rol} onChange={handleChange}>
                  <option value="ADMINISTRADOR">Administrador</option>
                  <option value="VETERINARIO">Veterinario</option>
                  <option value="CUIDADOR">Cuidador</option>
                  <option value="CLIENTE">Cliente</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button className="btn-primary-custom w-100" type="submit" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </Form>

            <div className="auth-switch">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </div>
          </Card.Body>
        </Card>
      </section>

      <footer className="auth-footer">
        © 2024 Sistema de Gestión de Caballeriza. Todos los derechos reservados.
      </footer>
    </main>
  );
}
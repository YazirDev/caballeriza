import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
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
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "No se pudo iniciar sesión");
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
        <Card className="auth-card">
          <Card.Body>
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Ingresa tus credenciales para acceder al panel de control de la caballeriza.</p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="admin1"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="admin123"
                  required
                />
              </Form.Group>

              <Form.Check className="mb-3" label="Recordarme en este dispositivo" />

              <Button className="btn-primary-custom w-100" type="submit" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar al Sistema"}
                {!loading && <i className="bi bi-arrow-right ms-2"></i>}
              </Button>
            </Form>

            <div className="auth-switch">
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
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
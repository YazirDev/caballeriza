import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="auth-page">
      <nav className="auth-navbar">
        <Link to="/dashboard" className="auth-brand">
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

      <section className="not-found-content">
        <img
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=700&q=80"
          alt="Caballo"
        />

        <h1>¡Oops! Te has salido del sendero</h1>

        <p>
          Parece que el caballo que buscas ha saltado la valla. La página que
          intentas visitar no existe o ha sido movida a otra sección.
        </p>

        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <Link to="/dashboard" className="btn btn-primary-custom">
            <i className="bi bi-house me-2"></i>
            Volver al Dashboard
          </Link>

          <button className="btn btn-light border" onClick={() => window.history.back()}>
            <i className="bi bi-arrow-left me-2"></i>
            Regresar
          </button>
        </div>
      </section>

      <footer className="auth-footer">
        © 2024 Sistema de Gestión de Caballeriza. Todos los derechos reservados.
      </footer>
    </main>
  );
}
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/caballos", label: "Caballos" },
  { path: "/personal", label: "Personal" },
  { path: "/reservas", label: "Reservas" },
  { path: "/alimentacion", label: "Alimentación" },
  { path: "/inventario", label: "Inventario" },
  { path: "/alertas", label: "Alertas" }
];

export default function Sidebar() {
  return (
    <aside className="d-none d-lg-block bg-light border-end min-vh-100 p-3">
      <h6 className="text-uppercase text-muted mb-3">Menú</h6>

      <Nav className="flex-column gap-1">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={NavLink}
            to={item.path}
            className={({ isActive }) =>
              `rounded px-3 py-2 ${isActive ? "bg-dark text-white" : "text-dark"}`
            }
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
}
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "bi bi-grid-1x2",
  },
  {
    label: "Caballos",
    path: "/horses",
    icon: "bi bi-shield-check",
  },
  {
    label: "Personal",
    path: "/staff",
    icon: "bi bi-people",
  },
  {
    label: "Reservas",
    path: "/reservations",
    icon: "bi bi-calendar-event",
  },
  {
    label: "Alimentación",
    path: "/feeding",
    icon: "bi bi-cup-hot",
  },
  {
    label: "Inventario",
    path: "/inventory",
    icon: "bi bi-box-seam",
  },
  {
    label: "Alertas",
    path: "/alerts",
    icon: "bi bi-exclamation-triangle",
  },
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <i className="bi bi-lightning-charge-fill"></i>
        </div>
        <span>Gestión de Caballeriza</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
            <i className="bi bi-chevron-right ms-auto sidebar-chevron"></i>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <small>SISTEMA V1.0</small>
        <small>Proyecto Programación IV - 2026</small>
      </div>
    </aside>
  );
}
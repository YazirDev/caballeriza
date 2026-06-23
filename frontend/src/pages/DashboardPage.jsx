import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getAlertas } from "../api/alertsApi";
import { getInventario } from "../api/inventoryApi";
import { getCaballos } from "../api/horseApi";
import { getPersonal } from "../api/staffApi";
import { getReservas } from "../api/reservationsApi";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/common/StatCard";
import Loading from "../components/common/Loading";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ caballos: 0, personal: 0, reservas: 0, alertas: 0, stockBajo: 0 });
  const [reservas, setReservas] = useState([]);
  const [alertas, setAlertas] = useState([]);

  useEffect(() => { loadDashboard(); }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [caballosR, personalR, reservasR, alertasR, inventarioR] = await Promise.allSettled([
        getCaballos(), getPersonal(), getReservas(), getAlertas(), getInventario(),
      ]);

      const caballos    = caballosR.status    === "fulfilled" ? caballosR.value    : [];
      const personal    = personalR.status    === "fulfilled" ? personalR.value    : [];
      const reservasList= reservasR.status    === "fulfilled" ? reservasR.value    : [];
      const alertasList = alertasR.status     === "fulfilled" ? alertasR.value     : [];
      const inventario  = inventarioR.status  === "fulfilled" ? inventarioR.value  : [];

      setStats({
        caballos:  Array.isArray(caballos)     ? caballos.length  : 0,
        personal:  Array.isArray(personal)     ? personal.length  : 0,
        reservas:  Array.isArray(reservasList) ? reservasList.length : 0,
        // FIX: backend Alerta uses 'leida' (boolean), not 'read'
        alertas:   Array.isArray(alertasList)  ? alertasList.filter((a) => !a.leida).length : 0,
        // FIX: backend Inventario uses 'cantidad' not 'stockActual'
        stockBajo: Array.isArray(inventario)
          ? inventario.filter((i) => Number(i.cantidad || 0) <= Number(i.stockMinimo || 0)).length
          : 0,
      });

      setReservas(Array.isArray(reservasList) ? reservasList.slice(0, 5) : []);
      setAlertas(Array.isArray(alertasList)   ? alertasList.slice(0, 4) : []);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading text="Cargando dashboard..." />;

  return (
    <>
      <PageHeader
        title="Dashboard General"
        subtitle="Bienvenido de nuevo, aquí tienes el resumen operativo de hoy."
        actionLabel="Ver Caballos"
        actionIcon="bi bi-shield-check"
        onAction={() => (window.location.href = "/horses")}
        secondaryLabel="Nueva Reserva"
        secondaryIcon="bi bi-calendar-plus"
        onSecondary={() => (window.location.href = "/reservations")}
      />

      <Row className="g-3 mb-4">
        <Col md={6} xl={3}>
          <StatCard title="Total de caballos" value={stats.caballos} subtitle="Registrados" icon="bi bi-shield-check" />
        </Col>
        <Col md={6} xl={3}>
          <StatCard title="Personal activo" value={stats.personal} subtitle="Miembros" icon="bi bi-people" variant="success" />
        </Col>
        <Col md={6} xl={3}>
          <StatCard title="Reservas" value={stats.reservas} subtitle="Agendadas" icon="bi bi-calendar-event" variant="warning" />
        </Col>
        <Col md={6} xl={3}>
          <StatCard title="Alertas críticas" value={stats.alertas} subtitle="Pendientes" icon="bi bi-exclamation-triangle" variant="danger" />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <div className="card-soft mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold mb-1">Actividad Reciente</h5>
                <p className="text-muted mb-0">Resumen de operaciones de la caballeriza.</p>
              </div>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <i className="bi bi-shield-check"></i>
                <div>
                  <strong>Caballos registrados</strong>
                  <span>{stats.caballos} caballos disponibles en el sistema</span>
                </div>
              </div>
              <div className="activity-item">
                <i className="bi bi-people"></i>
                <div>
                  <strong>Personal registrado</strong>
                  <span>{stats.personal} empleados vinculados a la caballeriza</span>
                </div>
              </div>
              <div className="activity-item">
                <i className="bi bi-box-seam"></i>
                <div>
                  <strong>Stock bajo</strong>
                  <span>{stats.stockBajo} insumos requieren revisión</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-soft">
            <h5 className="fw-bold mb-3">Alertas recientes</h5>
            {alertas.length === 0 ? (
              <p className="text-muted mb-0">No hay alertas registradas.</p>
            ) : (
              alertas.map((alerta) => (
                <div key={alerta.id} className="dashboard-alert">
                  <i className="bi bi-exclamation-triangle"></i>
                  <div>
                    {/* FIX: backend uses 'tipo' and 'mensaje', not 'titulo'/'descripcion' */}
                    <strong>{alerta.tipo || "Alerta"}</strong>
                    <p>{alerta.mensaje || "Revisar alerta del sistema"}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="card-soft mb-4">
            <h5 className="fw-bold mb-3">Próximas Reservas</h5>
            {reservas.length === 0 ? (
              <p className="text-muted mb-0">No hay reservas próximas.</p>
            ) : (
              reservas.map((reserva) => (
                <div key={reserva.id} className="reservation-mini">
                  <div>
                    {/* FIX: backend Reserva has caballo object and tipo, no 'cliente' field */}
                    <strong>{reserva.caballo?.nombre || "Reserva"}</strong>
                    <span>{reserva.tipo || "Actividad"}</span>
                  </div>
                  <small>{reserva.fecha ? new Date(reserva.fecha).toLocaleDateString("es-CR") : ""}</small>
                </div>
              ))
            )}
          </div>

          <div className="card-soft system-status">
            <h5 className="fw-bold mb-3">Estado del Sistema</h5>
            <div className="progress mb-3">
              <div className="progress-bar" style={{ width: "84%" }}></div>
            </div>
            <Row>
              <Col>
                <div className="status-box">
                  <strong>{stats.caballos}</strong>
                  <span>Caballos</span>
                </div>
              </Col>
              <Col>
                <div className="status-box">
                  <strong>{stats.alertas}</strong>
                  <span>Alertas</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

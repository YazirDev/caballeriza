import { useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { createTareaEmpleado, createTurnoEmpleado, getEmpleadoById, getTareasEmpleado, getTurnosEmpleado } from "../api/staffApi";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/layout/PageHeader";
import ShiftForm from "../components/staff/ShiftForm";
import TaskForm from "../components/staff/TaskForm";

export default function StaffDetailPage() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDetail();
  }, [id]);

  async function loadDetail() {
    setLoading(true);

    try {
      const [employeeData, turnosData, tareasData] = await Promise.allSettled([
        getEmpleadoById(id),
        getTurnosEmpleado(id),
        getTareasEmpleado(id),
      ]);

      setEmployee(employeeData.status === "fulfilled" ? employeeData.value : null);
      setTurnos(turnosData.status === "fulfilled" && Array.isArray(turnosData.value) ? turnosData.value : []);
      setTareas(tareasData.status === "fulfilled" && Array.isArray(tareasData.value) ? tareasData.value : []);
    } finally {
      setLoading(false);
    }
  }

  async function handleShiftSubmit(payload) {
    setSaving(true);

    try {
      await createTurnoEmpleado(id, payload);
      setShowShiftForm(false);
      await loadDetail();
    } finally {
      setSaving(false);
    }
  }

  async function handleTaskSubmit(payload) {
    setSaving(true);

    try {
      await createTareaEmpleado(id, payload);
      setShowTaskForm(false);
      await loadDetail();
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading text="Cargando detalle del empleado..." />;
  }

  if (!employee) {
    return <EmptyState title="Empleado no encontrado" message="No fue posible cargar el empleado." />;
  }

  return (
    <>
      <PageHeader
        title="Detalle del Empleado"
        subtitle="Información, turnos asignados y responsabilidades operativas."
        actionLabel="Nueva Tarea"
        actionIcon="bi bi-plus-lg"
        onAction={() => setShowTaskForm(true)}
        secondaryLabel="Nuevo Turno"
        secondaryIcon="bi bi-clock"
        onSecondary={() => setShowShiftForm(true)}
      />

      <Link to="/staff" className="back-link">
        <i className="bi bi-arrow-left"></i> Volver al listado
      </Link>

      <Row className="g-4 mt-1">
        <Col lg={8}>
          <div className="card-soft employee-header mb-4">
            <div className="avatar-large">{(employee.nombre || "E").charAt(0)}</div>

            <div>
              <h3>{employee.nombre}</h3>
              <p>{employee.contacto}</p>
              <Badge bg="light" text="dark">
                {employee.rol}
              </Badge>
            </div>
          </div>

          <div className="card-soft">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Lista de Responsabilidades</h5>
              <Button className="btn-primary-custom" size="sm" onClick={() => setShowTaskForm(true)}>
                Nueva Tarea
              </Button>
            </div>

            {tareas.length === 0 ? (
              <EmptyState title="Sin tareas asignadas" message="Asigna una nueva tarea a este empleado." />
            ) : (
              tareas.map((tarea) => (
                <div key={tarea.id} className="task-item">
                  <div>
                    <strong>{tarea.titulo || tarea.title}</strong>
                    <p>{tarea.descripcion}</p>
                  </div>
                  <Badge bg={tarea.prioridad === "ALTA" || tarea.prioridad === "Alta" ? "danger" : "secondary"}>
                    {tarea.prioridad || "Media"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="card-soft">
            <h5 className="fw-bold mb-3">Próximos Turnos</h5>

            {turnos.length === 0 ? (
              <p className="text-muted mb-0">No hay turnos asignados.</p>
            ) : (
              turnos.map((turno) => (
                <div key={turno.id} className="reservation-mini">
                  <div>
                    <strong>{turno.fecha}</strong>
                    <span>{turno.descripcion || "Turno operativo"}</span>
                  </div>
                  <small>
                    {turno.horaInicio} - {turno.horaFin}
                  </small>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>

      <ShiftForm show={showShiftForm} onClose={() => setShowShiftForm(false)} onSubmit={handleShiftSubmit} employees={[employee]} loading={saving} />

      <TaskForm show={showTaskForm} onClose={() => setShowTaskForm(false)} onSubmit={handleTaskSubmit} employees={[employee]} loading={saving} />
    </>
  );
}
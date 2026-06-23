import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createEmpleado, deleteEmpleado, getPersonal, updateEmpleado } from "../api/staffApi";
import PageHeader from "../components/layout/PageHeader";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import StaffForm from "../components/staff/StaffForm";

export default function StaffPage() {
  const navigate = useNavigate();

  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadPersonal();
  }, [location.pathname]);

  async function loadPersonal() {
    setLoading(true);

    try {
      const data = await getPersonal();
      setPersonal(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  const filteredPersonal = useMemo(() => {
    return personal.filter((employee) => {
      const text = `${employee.nombre || ""} ${employee.rol || ""} ${employee.contacto || ""}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [personal, search]);

  function openCreate() {
    setSelectedEmployee(null);
    setShowForm(true);
  }

  function openEdit(employee) {
    setSelectedEmployee(employee);
    setShowForm(true);
  }

  async function handleSubmit(payload) {
    setSaving(true);

    try {
      if (selectedEmployee) {
        await updateEmpleado(selectedEmployee.id, payload);
      } else {
        await createEmpleado(payload);
      }

      setShowForm(false);
      setSelectedEmployee(null);
      await loadPersonal();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    await deleteEmpleado(deleteTarget.id);
    setDeleteTarget(null);
    await loadPersonal();
  }

  if (loading) {
    return <Loading text="Cargando personal..." />;
  }

  return (
    <>
      <PageHeader
        title="Personal de Caballeriza"
        subtitle="Administra el equipo, roles operativos, turnos y tareas."
        actionLabel="Nuevo Empleado"
        actionIcon="bi bi-plus-lg"
        onAction={openCreate}
        secondaryLabel="Filtrar"
        secondaryIcon="bi bi-funnel"
      />

      <div className="table-card">
        <div className="table-toolbar">
          <Form.Control
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre, rol o contacto..."
          />
        </div>

        {filteredPersonal.length === 0 ? (
          <EmptyState
            icon="bi bi-people"
            title="No hay empleados registrados"
            message="Agrega empleados para asignar turnos y tareas."
            actionLabel="Nuevo empleado"
            onAction={openCreate}
          />
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Rol</th>
                  <th>Contacto</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredPersonal.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-circle">{(employee.nombre || "E").charAt(0)}</div>
                        <strong>{employee.nombre}</strong>
                      </div>
                    </td>

                    <td>
                      <Badge bg="light" text="dark">
                        {employee.rol}
                      </Badge>
                    </td>

                    <td>{employee.contacto}</td>

                    <td>
                      <Badge bg="success">Activo</Badge>
                    </td>

                    <td className="text-end">
                      <Button variant="light" size="sm" onClick={() => navigate(`/staff/${employee.id}`)}>
                        <i className="bi bi-eye"></i>
                      </Button>{" "}
                      <Button variant="light" size="sm" onClick={() => openEdit(employee)}>
                        <i className="bi bi-pencil"></i>
                      </Button>{" "}
                      <Button variant="light" size="sm" className="text-danger" onClick={() => setDeleteTarget(employee)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <StaffForm show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} employee={selectedEmployee} loading={saving} />

      <ConfirmModal
        show={Boolean(deleteTarget)}
        title="Eliminar empleado"
        message={`¿Deseas eliminar a ${deleteTarget?.nombre || "este empleado"}?`}
        confirmText="Eliminar"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
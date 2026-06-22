import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { cancelarReserva, createReserva, getReservas } from "../api/reservationsApi";
import { getCaballos } from "../api/horseApi";
import PageHeader from "../components/layout/PageHeader";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import ReservationForm from "../components/reservations/ReservationForm";

export default function ReservationsPage() {
  const [reservas, setReservas] = useState([]);
  const [caballos, setCaballos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);

    try {
      const [reservasData, caballosData] = await Promise.allSettled([getReservas(), getCaballos()]);
      setReservas(reservasData.status === "fulfilled" && Array.isArray(reservasData.value) ? reservasData.value : []);
      setCaballos(caballosData.status === "fulfilled" && Array.isArray(caballosData.value) ? caballosData.value : []);
    } finally {
      setLoading(false);
    }
  }

  const filteredReservas = useMemo(() => {
    return reservas.filter((reserva) => {
      const text = `${reserva.cliente || ""} ${reserva.tipo || ""} ${reserva.estado || ""}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [reservas, search]);

  async function handleSubmit(payload) {
    setSaving(true);

    try {
      await createReserva(payload);
      setShowForm(false);
      await loadPage();
    } finally {
      setSaving(false);
    }
  }

  async function handleCancel(id) {
    await cancelarReserva(id);
    await loadPage();
  }

  if (loading) {
    return <Loading text="Cargando reservas..." />;
  }

  return (
    <>
      <PageHeader
        title="Calendario de Reservas"
        subtitle="Gestiona citas veterinarias, entrenamientos, montas y paseos."
        actionLabel="Nueva Reserva"
        actionIcon="bi bi-plus-lg"
        onAction={() => setShowForm(true)}
        secondaryLabel="Vista Calendario"
        secondaryIcon="bi bi-calendar3"
      />

      <div className="table-card">
        <div className="table-toolbar">
          <Form.Control
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por cliente, tipo o estado..."
          />
        </div>

        {filteredReservas.length === 0 ? (
          <EmptyState
            icon="bi bi-calendar-event"
            title="No hay reservas registradas"
            message="Crea una reserva para veterinario, paseo, monta o entrenamiento."
            actionLabel="Nueva reserva"
            onAction={() => setShowForm(true)}
          />
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Caballo</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredReservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.cliente}</td>
                    <td>{reserva.caballo?.nombre || reserva.caballoNombre || reserva.caballoId}</td>
                    <td>{reserva.tipo}</td>
                    <td>{reserva.fecha}</td>
                    <td>
                      {reserva.horaInicio} - {reserva.horaFin}
                    </td>
                    <td>
                      <Badge bg={reserva.estado === "CANCELADA" ? "danger" : "success"}>
                        {reserva.estado || "PENDIENTE"}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <Button variant="light" size="sm" className="text-danger" onClick={() => handleCancel(reserva.id)}>
                        Cancelar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <ReservationForm show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} horses={caballos} loading={saving} />
    </>
  );
}
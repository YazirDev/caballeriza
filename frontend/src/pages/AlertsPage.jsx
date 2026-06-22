import { useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { generarAlertas, getAlertas, marcarAlertaLeida } from "../api/alertsApi";
import PageHeader from "../components/layout/PageHeader";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import AlertItem from "../components/alerts/AlertItem";

export default function AlertsPage() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("TODAS");

  useEffect(() => {
    loadAlertas();
  }, []);

  async function loadAlertas() {
    setLoading(true);

    try {
      const data = await getAlertas();
      setAlertas(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  const filteredAlertas = useMemo(() => {
    if (filter === "NO_LEIDAS") {
      return alertas.filter((alerta) => !alerta.leida && !alerta.read);
    }

    if (filter === "LEIDAS") {
      return alertas.filter((alerta) => alerta.leida || alerta.read);
    }

    return alertas;
  }, [alertas, filter]);

  async function handleRead(id) {
    await marcarAlertaLeida(id);
    await loadAlertas();
  }

  async function handleGenerate() {
    await generarAlertas();
    await loadAlertas();
  }

  if (loading) {
    return <Loading text="Cargando alertas..." />;
  }

  return (
    <>
      <PageHeader
        title="Centro de Alertas"
        subtitle="Gestiona avisos, notificaciones críticas y eventos del sistema."
        badge={`${alertas.length} alertas`}
        actionLabel="Generar Alertas"
        actionIcon="bi bi-arrow-clockwise"
        onAction={handleGenerate}
        secondaryLabel="Marcar todas como leídas"
        secondaryIcon="bi bi-check2-all"
      />

      <div className="card-soft mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div className="alert-tabs">
            <Button variant={filter === "TODAS" ? "dark" : "light"} size="sm" onClick={() => setFilter("TODAS")}>
              Todas
            </Button>
            <Button variant={filter === "NO_LEIDAS" ? "dark" : "light"} size="sm" onClick={() => setFilter("NO_LEIDAS")}>
              No leídas
            </Button>
            <Button variant={filter === "LEIDAS" ? "dark" : "light"} size="sm" onClick={() => setFilter("LEIDAS")}>
              Leídas
            </Button>
          </div>

          <Form.Select className="w-auto">
            <option>Prioridad</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </Form.Select>
        </div>
      </div>

      {filteredAlertas.length === 0 ? (
        <EmptyState
          icon="bi bi-bell"
          title="No hay alertas"
          message="Cuando se generen alertas de vacunas, tratamientos o stock bajo aparecerán aquí."
          actionLabel="Generar alertas"
          onAction={handleGenerate}
        />
      ) : (
        filteredAlertas.map((alerta) => (
          <AlertItem key={alerta.id} alert={alerta} onRead={handleRead} />
        ))
      )}
    </>
  );
}
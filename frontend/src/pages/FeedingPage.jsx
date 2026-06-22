import { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";
import { getCaballos } from "../api/horseApi";
import { createPlanAlimentacion, createSuministro, getPlanesByCaballo, getSuministrosByCaballo } from "../api/feedingApi";
import PageHeader from "../components/layout/PageHeader";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import FeedingPlanForm from "../components/feeding/FeedingPlanForm";
import SupplyForm from "../components/feeding/SupplyForm";

export default function FeedingPage() {
  const [caballos, setCaballos] = useState([]);
  const [selectedCaballoId, setSelectedCaballoId] = useState("");
  const [planes, setPlanes] = useState([]);
  const [suministros, setSuministros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showSupplyForm, setShowSupplyForm] = useState(false);

  useEffect(() => {
    loadCaballos();
  }, []);

  useEffect(() => {
    if (selectedCaballoId) {
      loadFeedingData(selectedCaballoId);
    }
  }, [selectedCaballoId]);

  async function loadCaballos() {
    setLoading(true);

    try {
      const data = await getCaballos();
      const list = Array.isArray(data) ? data : [];
      setCaballos(list);

      if (list.length > 0) {
        setSelectedCaballoId(String(list[0].id));
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadFeedingData(caballoId) {
    const [planesData, suministrosData] = await Promise.allSettled([
      getPlanesByCaballo(caballoId),
      getSuministrosByCaballo(caballoId),
    ]);

    setPlanes(planesData.status === "fulfilled" && Array.isArray(planesData.value) ? planesData.value : []);
    setSuministros(suministrosData.status === "fulfilled" && Array.isArray(suministrosData.value) ? suministrosData.value : []);
  }

  async function handlePlanSubmit(payload) {
    setSaving(true);

    try {
      await createPlanAlimentacion(payload);
      setShowPlanForm(false);
      await loadFeedingData(payload.horseId || payload.caballoId);
    } finally {
      setSaving(false);
    }
  }

  async function handleSupplySubmit(payload) {
    setSaving(true);

    try {
      await createSuministro(payload);
      setShowSupplyForm(false);
      await loadFeedingData(payload.horseId || payload.caballoId);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading text="Cargando alimentación..." />;
  }

  return (
    <>
      <PageHeader
        title="Alimentación y Nutrición"
        subtitle="Gestiona planes personalizados y registros diarios de suministros."
        actionLabel="Nuevo Plan"
        actionIcon="bi bi-plus-lg"
        onAction={() => setShowPlanForm(true)}
        secondaryLabel="Registrar Suministro"
        secondaryIcon="bi bi-journal-plus"
        onSecondary={() => setShowSupplyForm(true)}
      />

      <div className="card-soft mb-4">
        <Form.Label>Caballo</Form.Label>
        <Form.Select value={selectedCaballoId} onChange={(event) => setSelectedCaballoId(event.target.value)}>
          {caballos.map((caballo) => (
            <option key={caballo.id} value={caballo.id}>
              {caballo.nombre}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <div className="card-soft h-100">
            <h5 className="fw-bold mb-3">Planes de Alimentación Activos</h5>

            {planes.length === 0 ? (
              <EmptyState title="Sin planes registrados" message="Crea un plan de alimentación para este caballo." />
            ) : (
              planes.map((plan) => (
                <div key={plan.id} className="feeding-plan-card">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6>{plan.tipoAlimento || plan.foodType}</h6>
                      <p>
                        {plan.cantidad} kg · {plan.frecuencia}
                      </p>
                    </div>
                    <Badge bg="success">Activo</Badge>
                  </div>
                  <small className="text-muted">{plan.observaciones}</small>
                </div>
              ))
            )}
          </div>
        </Col>

        <Col lg={7}>
          <div className="table-card">
            <div className="table-title">
              <h5>Historial Reciente de Suministros</h5>
            </div>

            {suministros.length === 0 ? (
              <EmptyState title="Sin suministros registrados" message="Registra el primer suministro para este caballo." />
            ) : (
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Alimento</th>
                      <th>Cantidad</th>
                      <th>Fecha</th>
                      <th>Responsable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suministros.map((item) => (
                      <tr key={item.id}>
                        <td>{item.tipoAlimento}</td>
                        <td>{item.cantidad} kg</td>
                        <td>{item.fecha}</td>
                        <td>{item.responsable}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <FeedingPlanForm show={showPlanForm} onClose={() => setShowPlanForm(false)} onSubmit={handlePlanSubmit} horses={caballos} loading={saving} />

      <SupplyForm show={showSupplyForm} onClose={() => setShowSupplyForm(false)} onSubmit={handleSupplySubmit} horses={caballos} loading={saving} />
    </>
  );
}
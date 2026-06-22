import { useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { addHistorialCaballo, getCaballoById, getHistorialCaballo } from "../api/horseApi";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import MedicalHistoryForm from "../components/horses/MedicalHistoryForm";
import PageHeader from "../components/layout/PageHeader";

export default function HorseDetailPage() {
  const { id } = useParams();

  const [caballo, setCaballo] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMedicalForm, setShowMedicalForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDetail();
  }, [id]);

  async function loadDetail() {
    setLoading(true);

    try {
      const [caballoData, historialData] = await Promise.allSettled([
        getCaballoById(id),
        getHistorialCaballo(id),
      ]);

      setCaballo(caballoData.status === "fulfilled" ? caballoData.value : null);
      setHistorial(historialData.status === "fulfilled" && Array.isArray(historialData.value) ? historialData.value : []);
    } finally {
      setLoading(false);
    }
  }

  async function handleMedicalSubmit(payload) {
    setSaving(true);

    try {
      await addHistorialCaballo(id, payload);
      setShowMedicalForm(false);
      await loadDetail();
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading text="Cargando detalle del caballo..." />;
  }

  if (!caballo) {
    return <EmptyState title="Caballo no encontrado" message="No fue posible cargar este registro." />;
  }

  return (
    <>
      <PageHeader
        title="Detalle de Caballo"
        subtitle="Historial médico, información general y observaciones de salud."
        actionLabel="Agregar Registro Médico"
        actionIcon="bi bi-plus-lg"
        onAction={() => setShowMedicalForm(true)}
      />

      <Link to="/horses" className="back-link">
        <i className="bi bi-arrow-left"></i> Volver al listado
      </Link>

      <Row className="g-4 mt-1">
        <Col lg={4}>
          <div className="card-soft horse-profile">
            <img
              src={
                caballo.fotoUrl ||
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80"
              }
              alt={caballo.nombre}
            />

            <h3>{caballo.nombre}</h3>
            <p>{caballo.identificador}</p>

            <div className="profile-row">
              <span>Raza</span>
              <strong>{caballo.raza}</strong>
            </div>

            <div className="profile-row">
              <span>Edad</span>
              <strong>{caballo.edad} años</strong>
            </div>

            <div className="profile-row">
              <span>Sexo</span>
              <strong>{caballo.sexo}</strong>
            </div>

            <div className="profile-row">
              <span>Peso Actual</span>
              <strong>{caballo.peso} kg</strong>
            </div>
          </div>
        </Col>

        <Col lg={8}>
          <div className="card-soft">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-1">Historial Médico</h5>
                <p className="text-muted mb-0">Registro cronológico de vacunas, tratamientos y observaciones.</p>
              </div>

              <Badge bg="light" text="dark">
                {historial.length} registros
              </Badge>
            </div>

            {historial.length === 0 ? (
              <EmptyState title="Sin historial médico" message="Agrega vacunas, tratamientos, alergias u observaciones." />
            ) : (
              <div className="timeline">
                {historial.map((item) => (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-icon">
                      <i className="bi bi-heart-pulse"></i>
                    </div>

                    <div className="timeline-content">
                      <div className="d-flex justify-content-between gap-3">
                        <h6>{item.tipo || item.title || "Registro médico"}</h6>
                        <small>{item.fecha}</small>
                      </div>

                      <p>{item.descripcion}</p>

                      <small className="text-muted">
                        Responsable: {item.responsable || "No definido"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>

      <MedicalHistoryForm show={showMedicalForm} onClose={() => setShowMedicalForm(false)} onSubmit={handleMedicalSubmit} loading={saving} />
    </>
  );
}
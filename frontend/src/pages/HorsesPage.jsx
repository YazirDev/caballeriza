import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createCaballo, deleteCaballo, getCaballos, updateCaballo } from "../api/horseApi";
import PageHeader from "../components/layout/PageHeader";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import HorseForm from "../components/horses/HorseForm";

export default function HorsesPage() {
  const navigate = useNavigate();

  const [caballos, setCaballos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadCaballos();
  }, [location.pathname]);

  async function loadCaballos() {
    setLoading(true);

    try {
      const data = await getCaballos();
      setCaballos(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  const filteredCaballos = useMemo(() => {
    return caballos.filter((caballo) => {
      const text = `${caballo.nombre || ""} ${caballo.identificador || ""} ${caballo.raza || ""}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [caballos, search]);

  function openCreate() {
    setSelectedHorse(null);
    setShowForm(true);
  }

  function openEdit(caballo) {
    setSelectedHorse(caballo);
    setShowForm(true);
  }

  async function handleSubmit(payload) {
    setSaving(true);

    try {
      if (selectedHorse) {
        await updateCaballo(selectedHorse.id, payload);
      } else {
        await createCaballo(payload);
      }

      setShowForm(false);
      setSelectedHorse(null);
      await loadCaballos();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    await deleteCaballo(deleteTarget.id);
    setDeleteTarget(null);
    await loadCaballos();
  }

  if (loading) {
    return <Loading text="Cargando caballos..." />;
  }

  return (
    <>
      <PageHeader
        title="Listado de Caballos"
        subtitle="Gestiona la información, salud y registros de toda la cuadra."
        actionLabel="Agregar Caballo"
        actionIcon="bi bi-plus-lg"
        onAction={openCreate}
        secondaryLabel="Exportar"
        secondaryIcon="bi bi-download"
      />

      <div className="table-card">
        <div className="table-toolbar">
          <Form.Control
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre, identificador o raza..."
          />
        </div>

        {filteredCaballos.length === 0 ? (
          <EmptyState
            icon="bi bi-shield-check"
            title="No hay caballos registrados"
            message="Agrega el primer caballo para comenzar a gestionar la caballeriza."
            actionLabel="Agregar caballo"
            onAction={openCreate}
          />
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nombre / ID</th>
                  <th>Raza</th>
                  <th>Edad / Sexo</th>
                  <th>Peso</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredCaballos.map((caballo) => (
                  <tr key={caballo.id}>
                    <td>
                      <img
                        className="table-avatar"
                        src={
                          caballo.fotoUrl ||
                          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=160&q=80"
                        }
                        alt={caballo.nombre}
                      />
                    </td>

                    <td>
                      <strong>{caballo.nombre}</strong>
                      <br />
                      <small className="text-muted">{caballo.identificador}</small>
                    </td>

                    <td>{caballo.raza}</td>

                    <td>
                      {caballo.edad} años
                      <br />
                      <small className="text-muted">{caballo.sexo}</small>
                    </td>

                    <td>{caballo.peso} kg</td>

                    <td>
                      <Badge bg="success">Saludable</Badge>
                    </td>

                    <td className="text-end">
                      <Button variant="light" size="sm" onClick={() => navigate(`/horses/${caballo.id}`)}>
                        <i className="bi bi-eye"></i>
                      </Button>{" "}
                      <Button variant="light" size="sm" onClick={() => openEdit(caballo)}>
                        <i className="bi bi-pencil"></i>
                      </Button>{" "}
                      <Button variant="light" size="sm" className="text-danger" onClick={() => setDeleteTarget(caballo)}>
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

      <HorseForm show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} horse={selectedHorse} loading={saving} />

      <ConfirmModal
        show={Boolean(deleteTarget)}
        title="Eliminar caballo"
        message={`¿Deseas eliminar a ${deleteTarget?.nombre || "este caballo"}?`}
        confirmText="Eliminar"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  name:         "",
  category:     "ALIMENTO",  // FIX: uppercase enum
  currentStock: "",
  minimumStock: "",
  unit:         "kg",
};

export default function InventoryForm({ show, onClose, onSubmit, item, loading = false }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (item) {
      setForm({
        name:         item.nombre || item.name || "",
        category:     item.tipo   || item.category || "ALIMENTO",
        currentStock: item.cantidad     ?? item.stockActual     ?? item.currentStock ?? "",
        minimumStock: item.stockMinimo  ?? item.minimumStock    ?? "",
        unit:         item.unidad || item.unit || "kg",
      });
    } else {
      setForm(initialState);
    }
  }, [item, show]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      currentStock: Number(form.currentStock),
      minimumStock: Number(form.minimumStock),
    });
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{item ? "Editar insumo" : "Nuevo insumo"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Nombre del insumo</Form.Label>
                <Form.Control name="name" value={form.name} onChange={handleChange} required placeholder="Ej: Heno de alfalfa" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                {/* FIX: values match backend enum ALIMENTO / MEDICINA / OTRO */}
                <Form.Select name="category" value={form.category} onChange={handleChange}>
                  <option value="ALIMENTO">Alimento</option>
                  <option value="MEDICINA">Medicina</option>
                  <option value="OTRO">Limpieza / Equipo / Otro</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Unidad</Form.Label>
                <Form.Select name="unit" value={form.unit} onChange={handleChange}>
                  <option value="kg">kg</option>
                  <option value="pacas">pacas</option>
                  <option value="litros">litros</option>
                  <option value="unidades">unidades</option>
                  <option value="frascos">frascos</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Stock actual</Form.Label>
                <Form.Control type="number" name="currentStock" value={form.currentStock} onChange={handleChange} required />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Stock mínimo</Form.Label>
                <Form.Control type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} required />
              </Form.Group>
            </Col>
            {/* NOTE: fechaVencimiento does NOT exist in the Inventario model — field removed */}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={onClose}>Cancelar</Button>
          <Button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar insumo"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

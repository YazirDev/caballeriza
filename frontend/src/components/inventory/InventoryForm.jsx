import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  name: "",
  category: "Alimento",
  currentStock: "",
  minimumStock: "",
  unit: "kg",
  expirationDate: "",
};

export default function InventoryForm({
  show,
  onClose,
  onSubmit,
  item,
  loading = false,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || item.nombre || "",
        category: item.category || item.categoria || "Alimento",
        currentStock: item.currentStock || item.stockActual || "",
        minimumStock: item.minimumStock || item.stockMinimo || "",
        unit: item.unit || item.unidad || "kg",
        expirationDate: item.expirationDate || item.fechaVencimiento || "",
      });
    } else {
      setForm(initialState);
    }
  }, [item, show]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

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
          <Modal.Title>
            {item ? "Editar insumo" : "Nuevo insumo"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Nombre del insumo</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Heno de alfalfa premium"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Alimento">Alimento</option>
                  <option value="Medicina">Medicina</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Equipo">Equipo</option>
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
                <Form.Control
                  type="number"
                  name="currentStock"
                  value={form.currentStock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Stock mínimo</Form.Label>
                <Form.Control
                  type="number"
                  name="minimumStock"
                  value={form.minimumStock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Fecha de vencimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="expirationDate"
                  value={form.expirationDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>

          <Button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar insumo"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
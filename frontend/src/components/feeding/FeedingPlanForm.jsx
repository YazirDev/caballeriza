import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  horseId: "",
  foodType: "",
  quantity: "",
  frequency: "Mañana y noche",
  notes: "",
};

export default function FeedingPlanForm({
  show,
  onClose,
  onSubmit,
  horses = [],
  loading = false,
}) {
  const [form, setForm] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...form,
      quantity: Number(form.quantity),
    });

    setForm(initialState);
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo plan de alimentación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Caballo</Form.Label>
                <Form.Select
                  name="horseId"
                  value={form.horseId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un caballo</option>
                  {horses.map((horse) => (
                    <option key={horse.id} value={horse.id}>
                      {horse.nombre || horse.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Group>
                <Form.Label>Tipo de alimento</Form.Label>
                <Form.Control
                  name="foodType"
                  value={form.foodType}
                  onChange={handleChange}
                  placeholder="Ej: Heno de alfalfa"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  min="0"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Kg"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Frecuencia</Form.Label>
                <Form.Select
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                  <option value="Mañana y noche">Mañana y noche</option>
                  <option value="Tres veces al día">Tres veces al día</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Indicaciones especiales"
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
            {loading ? "Guardando..." : "Guardar plan"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
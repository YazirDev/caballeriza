import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  horseId: "",
  foodType: "",
  quantity: "",
  dateTime: "",
  responsible: "",
};

export default function SupplyForm({
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
          <Modal.Title>Registrar suministro</Modal.Title>
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
                      {horse.name || horse.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Group>
                <Form.Label>Alimento</Form.Label>
                <Form.Control
                  name="foodType"
                  value={form.foodType}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Avena premium"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Cantidad kg</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Fecha y hora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateTime"
                  value={form.dateTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Responsable</Form.Label>
                <Form.Control
                  name="responsible"
                  value={form.responsible}
                  onChange={handleChange}
                  required
                  placeholder="Nombre del responsable"
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
            {loading ? "Guardando..." : "Guardar suministro"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
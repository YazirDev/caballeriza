import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  horseId:   "",
  type:      "PASEO",
  date:      "",
  startTime: "",
  notes:     "",
};

export default function ReservationForm({ show, onClose, onSubmit, horses = [], loading = false }) {
  const [form, setForm] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(initialState);
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva reserva</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Caballo</Form.Label>
                <Form.Select name="horseId" value={form.horseId} onChange={handleChange} required>
                  <option value="">Seleccione un caballo</option>
                  {horses.map((horse) => (
                    <option key={horse.id} value={horse.id}>
                      {horse.nombre || horse.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Tipo de reserva</Form.Label>
                <Form.Select name="type" value={form.type} onChange={handleChange}>
                  <option value="VETERINARIO">Veterinario</option>  {/* FIX: enum values */}
                  <option value="MONTA">Monta</option>
                  <option value="PASEO">Paseo</option>
                  <option value="ENTRENAMIENTO">Entrenamiento</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Hora inicio</Form.Label>
                <Form.Control type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Notas</Form.Label>
                <Form.Control as="textarea" rows={3} name="notes" value={form.notes} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={onClose}>Cancelar</Button>
          <Button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar reserva"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

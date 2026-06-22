import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  name: "",
  identifier: "",
  age: "",
  breed: "",
  sex: "",
  weight: "",
  photoUrl: "",
  status: "Saludable",
};

export default function HorseForm({
  show,
  onClose,
  onSubmit,
  horse,
  loading = false,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (horse) {
      setForm({
        name: horse.name || horse.nombre || "",
        identifier: horse.identifier || horse.identificador || "",
        age: horse.age || horse.edad || "",
        breed: horse.breed || horse.raza || "",
        sex: horse.sex || horse.sexo || "",
        weight: horse.weight || horse.peso || "",
        photoUrl: horse.photoUrl || horse.foto || horse.imageUrl || "",
        status: horse.status || horse.estado || "Saludable",
      });
    } else {
      setForm(initialState);
    }
  }, [horse, show]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...form,
      age: Number(form.age),
      weight: Number(form.weight),
    });
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {horse ? "Editar caballo" : "Agregar caballo"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Relámpago"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Identificador</Form.Label>
                <Form.Control
                  name="identifier"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  placeholder="Ej: CAB-001"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Raza</Form.Label>
                <Form.Control
                  name="breed"
                  value={form.breed}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Pura Raza Española"
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  name="age"
                  type="number"
                  min="0"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Peso kg</Form.Label>
                <Form.Control
                  name="weight"
                  type="number"
                  min="0"
                  value={form.weight}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  name="sex"
                  value={form.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Saludable">Saludable</option>
                  <option value="Tratamiento">Tratamiento</option>
                  <option value="Observación">Observación</option>
                  <option value="Descanso">Descanso</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Foto URL opcional</Form.Label>
                <Form.Control
                  name="photoUrl"
                  value={form.photoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
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
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
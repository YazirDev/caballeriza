import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  name: "",
  email: "",
  phone: "",
  role: "Cuidador",
  status: "Activo",
};

export default function StaffForm({
  show,
  onClose,
  onSubmit,
  employee,
  loading = false,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || employee.nombre || "",
        email: employee.email || "",
        phone: employee.phone || employee.telefono || employee.contact || "",
        role: employee.role || employee.rol || "Cuidador",
        status: employee.status || employee.estado || "Activo",
      });
    } else {
      setForm(initialState);
    }
  }, [employee, show]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {employee ? "Editar empleado" : "Nuevo empleado"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Carlos Méndez"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="correo@caballeriza.com"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Teléfono / contacto</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+506 8888 8888"
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Rol</Form.Label>
                <Form.Select name="role" value={form.role} onChange={handleChange}>
                  <option value="Administrador">Administrador</option>
                  <option value="Veterinario">Veterinario</option>
                  <option value="Cuidador">Cuidador</option>
                  <option value="Potrador">Potrador</option>
                  <option value="Cliente">Cliente</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="En descanso">En descanso</option>
                  <option value="Licencia">Licencia</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>

          <Button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar empleado"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HorseCard({ horse }) {
  const navigate = useNavigate();

  const id = horse?.id;
  const name = horse?.name || horse?.nombre || "Caballo sin nombre";
  const identifier = horse?.identifier || horse?.identificador || `CAB-${id}`;
  const breed = horse?.breed || horse?.raza || "Raza no definida";
  const age = horse?.age || horse?.edad || "-";
  const sex = horse?.sex || horse?.sexo || "-";
  const status = horse?.status || horse?.estado || "Saludable";
  const imageUrl =
    horse?.photoUrl ||
    horse?.foto ||
    horse?.imageUrl ||
    "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80";

  return (
    <Card className="horse-card h-100" onClick={() => navigate(`/horses/${id}`)}>
      <Card.Img variant="top" src={imageUrl} className="horse-card-img" />

      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{name}</h5>
            <small className="text-muted">{identifier}</small>
          </div>

          <Badge bg={status === "Saludable" ? "success" : "warning"}>
            {status}
          </Badge>
        </div>

        <hr />

        <div className="small text-muted">
          <div>
            <strong>Raza:</strong> {breed}
          </div>
          <div>
            <strong>Edad:</strong> {age} años
          </div>
          <div>
            <strong>Sexo:</strong> {sex}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
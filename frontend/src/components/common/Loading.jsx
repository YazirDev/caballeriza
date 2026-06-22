import { Spinner } from "react-bootstrap";

export default function Loading({ text = "Cargando información..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" className="mb-3" />
      <p className="text-muted mb-0">{text}</p>
    </div>
  );
}
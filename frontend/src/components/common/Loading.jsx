import { Spinner } from "react-bootstrap";

export default function Loading({ text = "Cargando información..." }) {
  return (
    <div className="loading-box">
      <Spinner animation="border" size="sm" />
      <span>{text}</span>
    </div>
  );
}
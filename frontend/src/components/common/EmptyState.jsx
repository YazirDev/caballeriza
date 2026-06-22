import { Button } from "react-bootstrap";

export default function EmptyState({
  title = "No hay información disponible",
  description = "Cuando existan registros, aparecerán en esta sección.",
  actionLabel,
  onAction
}) {
  return (
    <div className="text-center bg-light border rounded p-5">
      <h2 className="h5 mb-2">{title}</h2>

      <p className="text-muted mb-4">{description}</p>

      {actionLabel && (
        <Button variant="dark" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
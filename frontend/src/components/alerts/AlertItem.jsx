import { Button, Badge } from "react-bootstrap";

function getAlertIcon(type) {
  const normalized = String(type || "").toLowerCase();

  if (normalized.includes("stock")) return "bi bi-box-seam";
  if (normalized.includes("vacuna")) return "bi bi-shield-plus";
  if (normalized.includes("tratamiento")) return "bi bi-capsule";
  if (normalized.includes("sistema")) return "bi bi-gear";
  if (normalized.includes("pedido")) return "bi bi-cart";

  return "bi bi-exclamation-triangle";
}

function getPriorityVariant(priority) {
  const normalized = String(priority || "").toLowerCase();

  if (normalized.includes("alta") || normalized.includes("crítica")) {
    return "danger";
  }

  if (normalized.includes("media")) {
    return "warning";
  }

  return "secondary";
}

export default function AlertItem({ alert, onRead }) {
  const id = alert?.id;
  const title = alert?.title || alert?.titulo || "Alerta del sistema";
  const description =
    alert?.description ||
    alert?.descripcion ||
    alert?.message ||
    "Revisar información de la alerta.";
  const type = alert?.type || alert?.tipo || "General";
  const priority = alert?.priority || alert?.prioridad || "Media";
  const createdAt = alert?.createdAt || alert?.fecha || "";
  const read = alert?.read || alert?.leida || false;

  return (
    <div className={`alert-item ${read ? "read" : "unread"}`}>
      <div className="alert-icon">
        <i className={getAlertIcon(type)}></i>
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between gap-2">
          <h6 className="mb-1">{title}</h6>

          <Badge bg={getPriorityVariant(priority)}>{priority}</Badge>
        </div>

        <p className="mb-1">{description}</p>

        <div className="d-flex flex-wrap gap-3 small text-muted">
          <span>
            <i className="bi bi-tag me-1"></i>
            {type}
          </span>

          {createdAt && (
            <span>
              <i className="bi bi-clock me-1"></i>
              {createdAt}
            </span>
          )}
        </div>
      </div>

      {!read && (
        <Button variant="light" size="sm" onClick={() => onRead?.(id)}>
          <i className="bi bi-check2"></i>
        </Button>
      )}
    </div>
  );
}
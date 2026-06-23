import { Button, Badge } from "react-bootstrap";

// Backend Alerta model: id, tipo (enum), mensaje, fechaGenerada, leida, referenciaId
// Enums: VACUNA_PROXIMA, TRATAMIENTO_VENCIDO, STOCK_BAJO

function getAlertIcon(tipo) {
  if (!tipo) return "bi bi-exclamation-triangle";
  const t = tipo.toString().toUpperCase();
  if (t.includes("VACUNA"))      return "bi bi-shield-plus";
  if (t.includes("TRATAMIENTO")) return "bi bi-capsule";
  if (t.includes("STOCK"))       return "bi bi-box-seam";
  return "bi bi-exclamation-triangle";
}

function getTipoLabel(tipo) {
  if (!tipo) return "General";
  const map = {
    VACUNA_PROXIMA:      "Vacuna próxima",
    TRATAMIENTO_VENCIDO: "Tratamiento vencido",
    STOCK_BAJO:          "Stock bajo",
  };
  return map[tipo.toString().toUpperCase()] || tipo;
}

function getBadgeVariant(tipo) {
  if (!tipo) return "secondary";
  const t = tipo.toString().toUpperCase();
  if (t.includes("VACUNA"))      return "warning";
  if (t.includes("TRATAMIENTO")) return "danger";
  if (t.includes("STOCK"))       return "danger";
  return "secondary";
}

export default function AlertItem({ alert, onRead }) {
  // FIX: map backend fields correctly
  const id        = alert?.id;
  const tipo      = alert?.tipo;
  const mensaje   = alert?.mensaje || alert?.message || "Revisar alerta del sistema.";
  const fechaGen  = alert?.fechaGenerada || alert?.fecha || "";
  const leida     = alert?.leida ?? alert?.read ?? false;

  // Format date nicely if it's an ISO string
  const fechaDisplay = fechaGen
    ? new Date(fechaGen).toLocaleString("es-CR", { dateStyle: "short", timeStyle: "short" })
    : "";

  return (
    <div className={`alert-item ${leida ? "read" : "unread"}`}>
      <div className="alert-icon">
        <i className={getAlertIcon(tipo)}></i>
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between gap-2">
          <h6 className="mb-1">{getTipoLabel(tipo)}</h6>
          <Badge bg={getBadgeVariant(tipo)}>{getTipoLabel(tipo)}</Badge>
        </div>

        <p className="mb-1">{mensaje}</p>

        {fechaDisplay && (
          <div className="small text-muted">
            <i className="bi bi-clock me-1"></i>
            {fechaDisplay}
          </div>
        )}
      </div>

      {!leida && (
        <Button variant="light" size="sm" onClick={() => onRead?.(id)}>
          <i className="bi bi-check2"></i>
        </Button>
      )}
    </div>
  );
}

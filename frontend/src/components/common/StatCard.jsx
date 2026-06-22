import { Card } from "react-bootstrap";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = "dark"
}) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h3 className={`mb-1 text-${variant}`}>{value}</h3>

            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>

          {icon && <div className="fs-2">{icon}</div>}
        </div>
      </Card.Body>
    </Card>
  );
}
import { Button } from "react-bootstrap";

export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  children
}) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <h1 className="h3 mb-1">{title}</h1>

        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>

      <div className="d-flex gap-2">
        {children}

        {actionLabel && (
          <Button variant="dark" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
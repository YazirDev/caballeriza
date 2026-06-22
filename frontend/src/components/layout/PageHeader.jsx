export default function PageHeader({
  title,
  subtitle,
  badge,
  actionLabel,
  actionIcon = "bi bi-plus",
  onAction,
  secondaryLabel,
  secondaryIcon = "bi bi-download",
  onSecondary,
}) {
  return (
    <div className="page-header">
      <div>
        <div className="d-flex align-items-center gap-2">
          <h1>{title}</h1>

          {badge && <span className="badge-soft-orange">{badge}</span>}
        </div>

        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="d-flex gap-2 flex-wrap">
        {secondaryLabel && (
          <button className="btn btn-light border" onClick={onSecondary}>
            <i className={`${secondaryIcon} me-2`}></i>
            {secondaryLabel}
          </button>
        )}

        {actionLabel && (
          <button className="btn btn-primary-custom" onClick={onAction}>
            <i className={`${actionIcon} me-2`}></i>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
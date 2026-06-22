export default function EmptyState({
  icon = "bi bi-inbox",
  title = "No hay información",
  message = "Cuando existan registros, aparecerán en esta sección.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <i className={icon}></i>
      </div>

      <h5>{title}</h5>
      <p>{message}</p>

      {actionLabel && (
        <button className="btn btn-primary-custom" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
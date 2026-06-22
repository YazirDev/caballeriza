export default function StatCard({
  title,
  value,
  subtitle,
  icon = "bi bi-graph-up",
  variant = "default",
}) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <div>
        <small>{title}</small>
        <h3>{value}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="stat-icon">
        <i className={icon}></i>
      </div>
    </div>
  );
}
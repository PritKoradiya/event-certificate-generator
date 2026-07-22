function SectionHeader({
  tag,
  title,
  subtitle,
  action,
  className = ""
}) {
  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5 ${className}`}>
      <div>
        {tag && (
          <p className="text-xs font-black uppercase tracking-wider text-blue-600 mb-1">
            {tag}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-sans">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm font-medium text-slate-600">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export default SectionHeader;

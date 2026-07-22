function EmptyState({
  title = "No items found",
  description = "No records or items match your criteria.",
  icon = "📂",
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm backdrop-blur-md">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl mb-4 shadow-xs">
        {icon}
      </span>
      <h3 className="text-xl font-black text-slate-950 font-sans tracking-tight">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-600">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;

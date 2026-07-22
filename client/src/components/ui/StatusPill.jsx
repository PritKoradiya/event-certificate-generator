function StatusPill({ status, variant = "default" }) {
  const getColors = () => {
    switch (status?.toLowerCase()) {
      case "generated":
      case "ready":
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "draft":
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "bulk":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "single":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${getColors()}`}>
      <span className="h-1.5 w-1.5 rounded-full fill-current bg-current opacity-80" />
      {status}
    </span>
  );
}

export default StatusPill;

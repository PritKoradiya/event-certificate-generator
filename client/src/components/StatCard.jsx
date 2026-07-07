function StatCard({ title, value, description, icon = "S", delayClass = "" }) {
  return (
    <div className={`card-hover slide-up rounded-2xl border border-slate-200 bg-white p-6 shadow-soft ${delayClass}`}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-base font-bold text-slate-500">{title}</p>
        <span className="pulse-soft flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-black text-primary-700">
          {icon}
        </span>
      </div>
      <h3 className="mt-5 text-4xl font-black tracking-tight text-slate-950">{value}</h3>
      {description && <p className="mt-3 text-base leading-7 text-slate-500">{description}</p>}
    </div>
  );
}

export default StatCard;

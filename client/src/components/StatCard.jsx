function StatCard({ title, value, description }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <h3 className="mt-3 text-2xl font-bold text-slate-950">{value}</h3>
      {description && <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>}
    </div>
  );
}

export default StatCard;

import { Link } from "react-router-dom";

function FeatureCard({
  title,
  description,
  to,
  btnText = "Open Tool",
  icon,
  badge,
  theme = "blue"
}) {
  const isBlue = theme === "blue" || theme === "certificate";
  const borderHover = isBlue ? "group-hover:border-blue-300" : "group-hover:border-purple-300";
  const iconBg = isBlue
    ? "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white"
    : "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white";

  const btnClass = isBlue
    ? "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
    : "bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white";

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm hover-lift backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${borderHover}`}>
      {/* Background Subtle Gradient Glow */}
      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isBlue ? "bg-blue-400/20" : "bg-purple-400/20"}`} />

      <div>
        <div className="flex items-center justify-between">
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl shadow-sm transition-all duration-300 ${iconBg}`}>
            {icon}
          </span>
          {badge && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-600">
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-5 text-xl font-black text-slate-950 font-sans tracking-tight">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-6 text-slate-600 font-medium">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          to={to}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-black transition-all duration-200 shadow-xs active:scale-98 ${btnClass}`}
        >
          <span>{btnText}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}

export default FeatureCard;

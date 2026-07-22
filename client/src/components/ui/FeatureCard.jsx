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

  const borderHover = isBlue
    ? "group-hover:border-blue-400/80 group-hover:shadow-blue-500/10"
    : "group-hover:border-purple-400/80 group-hover:shadow-purple-500/10";

  const iconBg = isBlue
    ? "bg-gradient-to-br from-blue-500/10 via-blue-500/20 to-indigo-500/10 text-blue-600 border-blue-200/80 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-blue-500/25"
    : "bg-gradient-to-br from-purple-500/10 via-purple-500/20 to-pink-500/10 text-purple-600 border-purple-200/80 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-purple-500/25";

  const badgeBg = isBlue
    ? "bg-blue-500/10 text-blue-700 border-blue-200/70"
    : "bg-purple-500/10 text-purple-700 border-purple-200/70";

  const btnClass = isBlue
    ? "bg-gradient-to-r from-blue-50 to-indigo-50/60 text-blue-700 border border-blue-200/60 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-blue-500/20"
    : "bg-gradient-to-r from-purple-50 to-pink-50/60 text-purple-700 border border-purple-200/60 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-purple-500/20";

  const decorativeCorner = isBlue ? (
    <svg className="absolute top-0 right-0 h-16 w-16 text-blue-500/10 group-hover:text-blue-500/20 transition-colors pointer-events-none" viewBox="0 0 100 100" fill="none">
      <path d="M0 0 H100 V100 Z" fill="currentColor" opacity="0.3" />
      <circle cx="80" cy="20" r="8" fill="currentColor" />
    </svg>
  ) : (
    <svg className="absolute top-0 right-0 h-16 w-16 text-purple-500/10 group-hover:text-purple-500/20 transition-colors pointer-events-none" viewBox="0 0 100 100" fill="none">
      <path d="M0 0 H100 V100 Z" fill="currentColor" opacity="0.3" />
      <circle cx="80" cy="20" r="8" fill="currentColor" />
    </svg>
  );

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm hover-lift backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${borderHover}`}>
      {/* Corner Graphic Element */}
      {decorativeCorner}

      {/* Layered Gradient Glow On Hover */}
      <div className={`absolute -left-12 -bottom-12 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isBlue ? "bg-blue-400/20" : "bg-purple-400/20"}`} />
      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isBlue ? "bg-indigo-400/20" : "bg-pink-400/20"}`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className={`flex h-13 w-13 items-center justify-center rounded-2xl border text-2xl shadow-xs transition-all duration-300 animate-icon-bob ${iconBg}`}>
            {icon}
          </span>
          {badge && (
            <span className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider ${badgeBg}`}>
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-5 text-xl font-black text-slate-950 font-sans tracking-tight">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 font-medium">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
        <Link
          to={to}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-black transition-all duration-300 active:scale-98 ${btnClass}`}
        >
          <span>{btnText}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
        </Link>
      </div>
    </div>
  );
}

export default FeatureCard;

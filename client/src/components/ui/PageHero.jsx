function PageHero({
  tag = "WORKSPACE",
  title,
  subtitle,
  children,
  theme = "blue"
}) {
  const isBlue = theme === "blue" || theme === "certificate";
  const tagColor = isBlue ? "text-blue-600" : "text-purple-600";
  const bgGradient = isBlue
    ? "from-blue-50/80 via-white to-indigo-50/40 border-blue-100/80"
    : "from-purple-50/80 via-white to-pink-50/40 border-purple-100/80";

  return (
    <div className={`relative overflow-hidden rounded-3xl border ${bgGradient} bg-gradient-to-br p-7 shadow-sm lg:p-9 animate-hero-fade-in`}>
      <div className={`absolute -left-12 -top-12 h-44 w-44 rounded-full blur-3xl ${isBlue ? "bg-blue-300/25" : "bg-purple-300/25"} animate-float-blob`} />
      <div className={`absolute right-0 bottom-0 h-56 w-56 rounded-full blur-3xl ${isBlue ? "bg-indigo-300/20" : "bg-pink-300/20"} animate-float-blob [animation-delay:4s]`} />

      <div className="relative z-10">
        {tag && (
          <span className={`text-xs font-black uppercase tracking-widest ${tagColor}`}>
            {tag}
          </span>
        )}
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-sans">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2.5 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

export default PageHero;

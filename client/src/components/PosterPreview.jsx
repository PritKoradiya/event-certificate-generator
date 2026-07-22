import posterData from "../data/posterData.js";

const templateMap = posterData.reduce((acc, item) => {
  acc[item.designKey] = item;
  acc[item.name] = item;
  return acc;
}, {});

function PosterPreview({
  id = "poster-preview",
  posterTitle = "ANNUAL INNOVATION & TECH SUMMIT 2026",
  tagline = "Empowering Next-Gen Innovators & Leaders",
  category = "Seminar",
  eventDate = "2026-08-15",
  eventTime = "10:00 AM - 04:00 PM",
  venue = "Main Auditorium, PP Savani University",
  speakerName = "Dr. Pritkumar Koradiya",
  speakerDesignation = "AI & Cloud Architecture Specialist",
  organizerName = "School of Engineering & Tech Club",
  description = "Join us for an immersive day of insightful technical talks, hands-on demonstrations, and networking opportunities with industry pioneers.",
  contactInformation = "+91 98765 43210 | info@ppsu.ac.in",
  registrationText = "Free Entry • Scan QR to Register Online",
  templateStyle = "Seminar Poster",
  designKey = "seminar-poster",
  posterImage = "",
  organizationLogo = "",
  posterId = "POSTER-2026-0001"
}) {
  const currentConfig =
    templateMap[designKey] ||
    templateMap[templateStyle] ||
    posterData[0];

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "Date TBA";

  return (
    <div
      id={id}
      className={`relative mx-auto aspect-[4/5] w-full max-w-[760px] overflow-hidden rounded-3xl bg-gradient-to-br ${currentConfig.backgroundClass} p-6 sm:p-10 text-white shadow-2xl flex flex-col justify-between select-none box-border border border-white/10`}
    >
      {/* Decorative Background Ornaments */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* TOP BAR: Logo, Category Badge, Tagline */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
        <div className="flex items-center gap-3">
          {organizationLogo ? (
            <img
              src={organizationLogo}
              alt="Organization Logo"
              className="h-11 w-11 rounded-xl object-contain bg-white/10 p-1 border border-white/20 shadow-xs"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white font-black text-xs border border-white/20">
              LOGO
            </div>
          )}
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-300">
              ORGANIZED BY
            </span>
            <span className="text-xs font-extrabold text-white truncate max-w-[220px] block">
              {organizerName || "Event Committee"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider ${currentConfig.badgeClass}`}>
            {category || currentConfig.category}
          </span>
        </div>
      </div>

      {/* HERO SECTION: Title & Tagline */}
      <div className="relative z-10 my-auto py-3 text-center space-y-3">
        {tagline && (
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
            {tagline}
          </p>
        )}

        <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight leading-[1.15] bg-clip-text text-transparent bg-gradient-to-r ${currentConfig.headingClass} font-sans drop-shadow-md`}>
          {posterTitle || "Event Poster Title"}
        </h1>

        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400" />
      </div>

      {/* MIDDLE SECTION: Optional Event Image & Speaker Details */}
      <div className="relative z-10 grid gap-4 sm:grid-cols-2 items-center my-2">
        {/* Featured Event Image / Poster Image */}
        {posterImage ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 shadow-lg">
            <img src={posterImage} alt="Event Visual" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="relative flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center">
            <div className="space-y-1">
              <span className="text-2xl block opacity-60">🖼️</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Event Banner Placeholder</p>
            </div>
          </div>
        )}

        {/* Speaker / Guest Spotlight Card */}
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md space-y-1.5 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300 block">
            FEATURED SPEAKER / GUEST
          </span>
          <p className="text-sm font-black text-white leading-tight">
            {speakerName || "Guest Speaker Name"}
          </p>
          <p className="text-xs font-semibold text-slate-300 leading-snug">
            {speakerDesignation || "Designation & Organization"}
          </p>
        </div>
      </div>

      {/* EVENT DESCRIPTION & CTA BLOCK */}
      <div className="relative z-10 rounded-2xl border border-white/15 bg-slate-900/80 p-4 backdrop-blur-md space-y-3 shadow-md">
        {description && (
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-medium line-clamp-3 text-justify">
            {description}
          </p>
        )}

        {/* DATE, TIME, VENUE STRIP */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
          <div className="rounded-xl bg-white/10 p-2 border border-white/10">
            <span className="block text-[9px] font-bold text-slate-400 uppercase">DATE</span>
            <span className="text-xs font-black text-white">{formattedDate}</span>
          </div>

          <div className="rounded-xl bg-white/10 p-2 border border-white/10">
            <span className="block text-[9px] font-bold text-slate-400 uppercase">TIME</span>
            <span className="text-xs font-black text-white truncate block">{eventTime || "TBA"}</span>
          </div>

          <div className="rounded-xl bg-white/10 p-2 border border-white/10">
            <span className="block text-[9px] font-bold text-slate-400 uppercase">VENUE</span>
            <span className="text-xs font-black text-white truncate block">{venue || "TBA"}</span>
          </div>
        </div>
      </div>

      {/* FOOTER STRIP: Contact, Registration, Poster ID */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-semibold text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{registrationText || "Scan QR / Register Online"}</span>
        </div>

        <div className="text-center sm:text-right">
          <span>{contactInformation}</span>
          <span className="block font-mono text-[9px] text-slate-400 opacity-70 mt-0.5">{posterId}</span>
        </div>
      </div>
    </div>
  );
}

export default PosterPreview;

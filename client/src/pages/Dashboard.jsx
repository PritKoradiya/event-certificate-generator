import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[calc(100vh-110px)]">
      {/* Hero Header Text */}
      <div className="mx-auto max-w-4xl text-center mb-8 lg:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400 backdrop-blur-md mb-4 animate-hero-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
          SMART EVENT DOCUMENT PLATFORM
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
          Event Certificate & Report Generator
        </h1>

        <p className="mt-4 text-base sm:text-xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Create professional certificates and structured academic event reports from one intelligent workspace.
        </p>

        <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-450 tracking-wide">
          Live previews, premium templates, bulk processing, photo reports, PDF export, and record management.
        </p>
      </div>

      {/* Two Main Module Cards */}
      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto w-full items-stretch">
        {/* Module Card 1: Event Certificate Generator */}
        <div className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-blue-500/10 flex flex-col justify-between">
          {/* Animated Background Mesh Glow */}
          <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-blue-500/15 blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
          <div className="absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-indigo-500/15 blur-3xl group-hover:bg-indigo-500/30 transition-all duration-500" />

          <div className="relative z-10">
            {/* Visual CSS Illustration: Certificate Layered Card */}
            <div className="relative mb-6 h-40 w-full overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 p-4 shadow-inner">
              {/* Gold Ornamental Corner */}
              <div className="absolute top-2 left-2 h-8 w-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg" />
              <div className="absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg" />

              {/* Layered Certificate Paper Stack Effect */}
              <div className="absolute inset-x-6 top-3 h-full rounded-xl bg-blue-500/10 border border-blue-400/10 transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
              <div className="relative h-full w-full rounded-xl border border-blue-400/30 bg-slate-900/90 p-3 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-16 rounded-full bg-blue-400/50" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-300/80">CERTIFICATE</span>
                  <div className="h-1.5 w-16 rounded-full bg-blue-400/50" />
                </div>
                <div className="my-auto text-center space-y-1.5">
                  <div className="mx-auto h-2 w-28 rounded-full bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 animate-pulse" />
                  <div className="mx-auto h-1.5 w-20 rounded-full bg-slate-600" />
                </div>
                <div className="flex items-end justify-between">
                  <div className="h-1.5 w-12 rounded-full bg-slate-700" />
                  {/* Decorative Seal Badge */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 text-[10px] font-black shadow-md transform group-hover:scale-110 transition-transform">
                    ★
                  </div>
                  <div className="h-1.5 w-12 rounded-full bg-slate-700" />
                </div>
              </div>
            </div>

            {/* Card Content */}
            <h2 className="text-2xl font-black text-white tracking-tight font-sans">
              Event Certificate Generator
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300 font-medium">
              Design single or bulk event certificates using professional templates, live preview, PDF export, ZIP download, and certificate record management.
            </p>

            {/* Feature Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Live Preview", "24+ Templates", "Bulk Generate", "PDF & ZIP", "Record Management"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="relative z-10 mt-6">
            <Link
              to="/certificate-dashboard"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-base font-black text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 active:scale-98"
            >
              <span>Launch Certificate Studio</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </div>

        {/* Module Card 2: Event Report Generator */}
        <div className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/50 hover:shadow-purple-500/10 flex flex-col justify-between">
          {/* Animated Background Mesh Glow */}
          <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-purple-500/15 blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
          <div className="absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-pink-500/15 blur-3xl group-hover:bg-pink-500/30 transition-all duration-500" />

          <div className="relative z-10">
            {/* Visual CSS Illustration: Event Report Stacked Pages with Photos */}
            <div className="relative mb-6 h-40 w-full overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 p-4 shadow-inner">
              {/* Stacked Pages Background Effect */}
              <div className="absolute right-8 top-3 h-[90%] w-28 rounded-lg bg-purple-500/10 border border-purple-400/10 transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              
              <div className="relative h-full w-full rounded-xl border border-purple-400/30 bg-slate-900/90 p-3 flex justify-between gap-3 shadow-lg">
                {/* Text lines page */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="h-2 w-20 rounded-full bg-purple-400/60" />
                    <div className="h-1 w-full rounded-full bg-slate-700" />
                    <div className="h-1 w-4/5 rounded-full bg-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full rounded-full bg-slate-700" />
                    <div className="h-1 w-2/3 rounded-full bg-slate-700" />
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1">
                    <div className="h-1 w-10 rounded-full bg-slate-600" />
                    <div className="h-1 w-10 rounded-full bg-slate-600" />
                  </div>
                </div>

                {/* Floating photo cards */}
                <div className="w-24 flex flex-col gap-1.5 justify-center">
                  <div className="h-11 w-full rounded-lg bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-400/30 p-1 flex items-center justify-center transform group-hover:-translate-y-0.5 transition-transform">
                    <span className="text-xs">📷</span>
                  </div>
                  <div className="h-11 w-full rounded-lg bg-gradient-to-br from-pink-500/20 to-coral-500/20 border border-pink-400/30 p-1 flex items-center justify-center transform group-hover:translate-y-0.5 transition-transform">
                    <span className="text-xs">🖼️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <h2 className="text-2xl font-black text-white tracking-tight font-sans">
              Event Report Generator
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300 font-medium">
              Create structured event reports with event details, objectives, outcomes, photos, signatures, records, and A4 PDF export.
            </p>

            {/* Feature Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Academic Format", "Photo Upload", "Live Preview", "A4 PDF", "Report Records"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="relative z-10 mt-6">
            <Link
              to="/report-dashboard"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 px-6 py-3.5 text-base font-black text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/40 active:scale-98"
            >
              <span>Launch Report Studio</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

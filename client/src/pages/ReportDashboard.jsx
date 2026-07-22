import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModuleHeader from "../components/ui/ModuleHeader.jsx";
import FeatureCard from "../components/ui/FeatureCard.jsx";
import { getDashboardStats } from "../services/dashboardApi.js";

function ReportDashboard() {
  const [statsData, setStatsData] = useState({
    total: 0,
    generated: 0,
    draft: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStats();
        if (result.success && result.data && result.data.eventReports) {
          setStatsData(result.data.eventReports);
        }
      } catch (error) {
        console.error("Failed to load report stats:", error);
      }
    };
    fetchStats();
  }, []);

  const featureCards = [
    {
      title: "Report Builder",
      description: "Enter event dates, resource speaker details, outline summary, objectives, outcomes, and coordinator details.",
      btnText: "Create Report",
      to: "/create-event-report",
      icon: "📋",
      badge: "Form Editor"
    },
    {
      title: "Academic Structure",
      description: "Standardized two-page mentor report layout formatted strictly according to academic university requirements.",
      btnText: "Start Report",
      to: "/create-event-report",
      icon: "🎓",
      badge: "Standard Layout"
    },
    {
      title: "Photo Documentation",
      description: "Upload up to 4 high-resolution event photographs with descriptive captions rendered on Page 2.",
      btnText: "Upload Photos",
      to: "/create-event-report",
      icon: "🖼️",
      badge: "Max 4 Photos"
    },
    {
      title: "Live Report Preview",
      description: "Real-time document view rendering both Page 1 and Page 2 as you type in the editor.",
      btnText: "Preview Mode",
      to: "/create-event-report",
      icon: "👁️",
      badge: "Real-Time"
    },
    {
      title: "A4 PDF Export",
      description: "Export crisp vector-quality A4 PDF documents ready for official university submission and print.",
      btnText: "View Exports",
      to: "/event-reports",
      icon: "📥",
      badge: "A4 Format"
    },
    {
      title: "Report Records",
      description: "Search, filter, view, edit details, upload replacement photos, or manage saved report records.",
      btnText: "Manage Reports",
      to: "/event-reports",
      icon: "📁",
      badge: `${statsData.total || "All"} Saved`
    }
  ];

  const quickInfoItems = [
    { label: "Mentor Format", icon: "🎓" },
    { label: "Photo Upload", icon: "🖼️" },
    { label: "Two-Page Preview", icon: "📄" },
    { label: "A4 PDF Export", icon: "📥" }
  ];

  return (
    <section className="space-y-8 pb-12">
      {/* Top Module Header */}
      <ModuleHeader
        title="Event Report Studio"
        subtitle="Academic event documentation workspace"
        theme="report"
        badge="Report Module"
        primaryAction={{
          label: "Create Event Report",
          to: "/create-event-report"
        }}
      />

      {/* ULTRA-PREMIUM HERO SECTION WITH CODE-BUILT A4 REPORT ILLUSTRATION */}
      <div className="relative overflow-hidden rounded-[2rem] border border-purple-200/80 bg-gradient-to-br from-purple-950/20 via-slate-900/90 to-pink-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl animate-module-hero-fade">
        {/* Layered Background Spotlight & Floating Orbs */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-purple-500/25 via-pink-400/20 to-transparent blur-3xl animate-float-orb" />
        <div className="absolute right-10 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-teal-500/20 via-pink-500/25 to-transparent blur-3xl animate-float-orb [animation-delay:6s]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-pink-400/15 blur-3xl animate-glow-pulse" />

        {/* Faint Dotted Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ec4899 1px, transparent 1px)`,
            backgroundSize: "28px 28px"
          }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Content Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-pink-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-pink-400 animate-ping" />
              ACADEMIC DOCUMENT WORKSPACE
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] font-sans">
              Turn event details and photos into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-teal-200">
                structured academic reports.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-medium max-w-2xl">
              Capture event information, objectives, outcomes, participants, photographs, coordinators, and export a complete A4 report.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/create-event-report"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 active:scale-98"
              >
                <span>Create Event Report</span>
                <span className="text-base font-bold">→</span>
              </Link>
              <Link
                to="/event-reports"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-6 py-3.5 text-sm font-black text-slate-200 shadow-md backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:bg-slate-800 hover:text-white active:scale-98"
              >
                <span>Manage Reports</span>
              </Link>
            </div>

            {/* Quick Info Bar */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickInfoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-950/40 px-3 py-2 text-xs font-extrabold text-purple-200 backdrop-blur-sm">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Original Code-Built Report Pages Graphic */}
          <div className="relative flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[1.35/1] rounded-2xl border border-purple-400/30 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/60 p-4 shadow-2xl overflow-hidden animate-subtle-parallax">
              
              {/* Two Stacked A4 Report Pages Visual */}
              <div className="relative h-full w-full flex gap-3">
                {/* Page 1 (Text & Event Details Layout) */}
                <div className="flex-1 rounded-xl border border-purple-400/30 bg-slate-900/95 p-3 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="h-2 w-16 rounded-full bg-purple-400/70 mb-2" />
                    <div className="space-y-1.5 border-b border-slate-800 pb-2">
                      <div className="h-1 w-full rounded-full bg-slate-700" />
                      <div className="h-1 w-4/5 rounded-full bg-slate-700" />
                      <div className="h-1 w-3/4 rounded-full bg-slate-700" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[8px] font-bold text-pink-300 uppercase">OBJECTIVES & OUTCOMES</p>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-pink-400" />
                      <div className="h-1 w-full rounded-full bg-slate-600" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-pink-400" />
                      <div className="h-1 w-5/6 rounded-full bg-slate-600" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[8px] text-slate-500 flex justify-between font-mono">
                    <span>PAGE 1 OF 2</span>
                    <span>A4</span>
                  </div>
                </div>

                {/* Page 2 (Photos & Signature Layout) */}
                <div className="flex-1 rounded-xl border border-pink-400/30 bg-slate-900/95 p-3 flex flex-col justify-between shadow-lg">
                  <div>
                    <span className="text-[8px] font-bold text-teal-300 uppercase block mb-1.5">PHOTO GALLERY</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-400/30 flex items-center justify-center">
                        <span className="text-[10px]">📷</span>
                      </div>
                      <div className="h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-coral-500/20 border border-pink-400/30 flex items-center justify-center">
                        <span className="text-[10px]">🖼️</span>
                      </div>
                    </div>
                  </div>

                  {/* Signature Blocks */}
                  <div className="space-y-1 pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-[7px] text-slate-400 font-bold">
                      <span>COORDINATOR</span>
                      <span>DEAN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-0.5 w-10 bg-slate-600" />
                      <div className="h-0.5 w-10 bg-slate-600" />
                    </div>
                  </div>

                  <div className="pt-1 text-[8px] text-slate-500 flex justify-between font-mono">
                    <span>PAGE 2 OF 2</span>
                    <span>A4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mini Chip Badge */}
            <div className="absolute -bottom-4 -left-2 sm:left-4 rounded-xl border border-purple-300/40 bg-slate-900/90 px-3.5 py-2 text-xs font-black text-white shadow-xl backdrop-blur-md flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-600 text-xs">📋</span>
              <span>Mentor A4 PDF Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE TOOLS GRID (6 CARDS) */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">DOCUMENTATION TOOLS</span>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight font-sans">
              Report Generator Tools
            </h2>
          </div>
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            6 Modules Active
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} theme="purple" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReportDashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModuleHeader from "../components/ui/ModuleHeader.jsx";
import FeatureCard from "../components/ui/FeatureCard.jsx";
import PageHero from "../components/ui/PageHero.jsx";
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
      description: "Enter event dates, resource person, objectives, outcomes, and coordinator details.",
      btnText: "Create Report",
      to: "/create-event-report",
      icon: "📋",
      badge: "Form Editor"
    },
    {
      title: "Academic Structure",
      description: "Standardized 2-page mentor report layout formatted according to university standards.",
      btnText: "Start Report",
      to: "/create-event-report",
      icon: "🎓",
      badge: "Standard Layout"
    },
    {
      title: "Photo Documentation",
      description: "Upload up to 4 high-resolution event photographs with custom descriptive captions.",
      btnText: "Upload Photos",
      to: "/create-event-report",
      icon: "🖼️",
      badge: "Max 4 Photos"
    },
    {
      title: "Live Report Preview",
      description: "Real-time document view rendering both Page 1 and Page 2 as you type.",
      btnText: "Preview Mode",
      to: "/create-event-report",
      icon: "👁️",
      badge: "Real-Time"
    },
    {
      title: "A4 PDF Export",
      description: "Export crisp vector-quality A4 PDF documents ready for official print and submission.",
      btnText: "View Exports",
      to: "/event-reports",
      icon: "📥",
      badge: "A4 Format"
    },
    {
      title: "Report Records",
      description: "Search, filter, view, edit details, upload replacement photos, or manage saved reports.",
      btnText: "Manage Reports",
      to: "/event-reports",
      icon: "📁",
      badge: `${statsData.total || "All"} Saved`
    }
  ];

  const capabilities = [
    "Mentor Format",
    "Event Details",
    "Objectives & Outcomes",
    "Photo Upload",
    "Two-Page Preview",
    "PDF Records"
  ];

  return (
    <section className="space-y-8 pb-10">
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

      {/* Hero Section */}
      <PageHero
        tag="ACADEMIC REPORT WORKSPACE"
        title="Turn event details and photos into structured academic reports."
        subtitle="Capture event information, objectives, outcomes, participants, photographs, coordinators, and export a complete A4 report."
        theme="purple"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/create-event-report"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-black text-white shadow-md transition hover:bg-purple-700 active:scale-98"
          >
            <span>Create Event Report</span>
            <span>→</span>
          </Link>
          <Link
            to="/event-reports"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-6 py-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-98"
          >
            <span>Manage Reports</span>
          </Link>
        </div>
      </PageHero>

      {/* Capability Strip */}
      <div className="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50/50 via-pink-50/30 to-purple-50/50 p-4 backdrop-blur-md shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
          <span className="text-purple-600 font-extrabold uppercase tracking-wider">Features:</span>
          {capabilities.map((cap) => (
            <span key={cap} className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 shadow-2xs border border-purple-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Feature Tools Grid (6 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight font-sans">
            Report Generator Tools
          </h2>
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            6 Documentation Modules
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

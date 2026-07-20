import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import { getDashboardStats } from "../services/dashboardApi.js";

const overviewItems = [
  "24+ certificate templates",
  "Standard A4 event reports",
  "Bulk generation available",
  "PDF and ZIP export ready"
];

function Dashboard() {
  const [statsData, setStatsData] = useState({
    certificates: { total: 0, generated: 0, draft: 0, single: 0, bulk: 0 },
    eventReports: { total: 0, generated: 0, draft: 0 },
    platform: { certificateTemplates: 24, posterDesigns: 12 }
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStats();
        if (result.success && result.data) {
          setStatsData(result.data);
        } else {
          setErrorMessage("Unable to load dashboard stats. Showing default overview.");
        }
      } catch (error) {
        console.error("Failed to load dashboard stats, using fallbacks:", error);
        setErrorMessage("Unable to load dashboard stats. Showing default overview.");
      }
    };
    fetchStats();
  }, []);

  const statsList = [
    {
      title: "Total Certificates",
      value: String(statsData.certificates.total),
      icon: "🏆",
      description: "Total single and bulk certificates created."
    },
    {
      title: "Generated Certificates",
      value: String(statsData.certificates.generated),
      icon: "🏅",
      description: "Saved and printed certificates."
    },
    {
      title: "Draft Certificates",
      value: String(statsData.certificates.draft),
      icon: "💾",
      description: "Certificate configurations saved as drafts."
    },
    {
      title: "Bulk Certificates",
      value: String(statsData.certificates.bulk),
      icon: "📄",
      description: "Certificates generated from bulk datasets."
    },
    {
      title: "Event Reports",
      value: String(statsData.eventReports.total),
      icon: "📋",
      description: "Total reports created for events."
    },
    {
      title: "Report Drafts",
      value: String(statsData.eventReports.draft),
      icon: "📁",
      description: "Event report configurations saved as drafts."
    },
    {
      title: "Certificate Templates",
      value: String(statsData.platform.certificateTemplates || 24),
      icon: "🎨",
      description: "Ready-to-use template styles."
    },
    {
      title: "Poster Designs",
      value: String(statsData.platform.posterDesigns || 12),
      icon: "🖼️",
      description: "Poster styles prepared for generation."
    }
  ];

  return (
    <section className="page-transition space-y-7">
      {errorMessage && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-base font-semibold text-amber-800 shadow-soft animate-fade-in flex items-center gap-3">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}
      {/* Welcome Banner / Hero Section */}
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-soft lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr] xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Workspace</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
              Event Certificate & Report Management Platform
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Create certificates, generate event reports, manage records, and export professional PDFs.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Quick Overview</p>
            <div className="mt-5 grid gap-3">
              {overviewItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-base font-bold text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Module Overview Section */}
      <section className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Platform Modules</p>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module Card 1: Event Certificate Generator */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50/10 p-7 shadow-md transition hover:shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl shadow-sm">
                🏆
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-950">Event Certificate Generator</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Create certificates with templates, bulk generation, PDF export, ZIP download, and record management.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/create-certificate" className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-750 font-bold rounded-xl text-sm transition shadow-sm">
                Create Certificate
              </Link>
              <Link to="/generated-certificates" className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-xl text-sm transition">
                Manage Certificates
              </Link>
              <Link to="/templates" className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-xl text-sm transition">
                Browse Templates
              </Link>
            </div>
          </div>

          {/* Module Card 2: Event Report Generator */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-cyan-50 via-white to-cyan-50/10 p-7 shadow-md transition hover:shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white text-2xl shadow-sm">
                📋
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-950">Event Report Generator</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Generate event reports with event details, objectives, outcomes, photos, and PDF export in academic format.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/create-event-report" className="px-5 py-2.5 bg-cyan-600 text-white hover:bg-cyan-750 font-bold rounded-xl text-sm transition shadow-sm">
                Create Event Report
              </Link>
              <Link to="/event-reports" className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-xl text-sm transition">
                Manage Event Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Cards Grid */}
      <section className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Workspace Statistics</p>
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
          {statsList.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delayClass={`delay-${Math.min(index + 1, 4)}00`} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Dashboard;

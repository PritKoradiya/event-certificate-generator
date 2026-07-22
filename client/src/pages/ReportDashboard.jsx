import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const features = [
    {
      title: "Create Event Report",
      description: "Enter event details and generate mentor-format event report.",
      btnText: "Create Event Report",
      link: "/create-event-report",
      icon: "📋"
    },
    {
      title: "Event Reports",
      description: "View, edit, delete, and download saved event reports.",
      btnText: "Manage Reports",
      link: "/event-reports",
      icon: "📁"
    },
    {
      title: "Photo Support",
      description: "Add event photos to report preview and PDF.",
      btnText: "Create Report",
      link: "/create-event-report",
      icon: "🖼️"
    },
    {
      title: "PDF Export",
      description: "Download A4 portrait event report PDF.",
      btnText: "Create Report",
      link: "/create-event-report",
      icon: "📥"
    }
  ];

  const stats = [
    { label: "A4 Report Format", icon: "📄" },
    { label: "Photo Upload Support", icon: "🖼️" },
    { label: "PDF Export Ready", icon: "📥" },
    { label: "Draft Reports Support", icon: "💾" },
    { label: "Report Records Saved", icon: "🗂️" },
    { label: "Edit/Delete Support", icon: "⚡" }
  ];

  const workflow = [
    { step: "Enter Event Details", desc: "Specify coordinators, date, venue, details, and attendees." },
    { step: "Add Objectives", desc: "Detail educational aims and background details of the activity." },
    { step: "Add Outcomes", desc: "Add learning benefits, takeaways, and outlines of the session." },
    { step: "Upload Photos", desc: "Attach up to 4 photos showcasing the event with a descriptive caption." },
    { step: "Download PDF", desc: "Instantly export the standard two-page structured A4 landscape/portrait PDF." }
  ];

  return (
    <section className="page-transition space-y-10 pb-10">
      {/* Back Link */}
      <div>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-cyan-600 hover:text-cyan-800 transition">
          <span>←</span>
          <span>Go to Main Dashboard</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-pink-500/10 p-8 shadow-soft lg:p-10 animate-hero-fade-in">
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl animate-float-blob" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-pink-500/10 blur-2xl animate-float-blob [animation-delay:4s]" />

        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-wider text-cyan-600">Module Workspace</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-950">Event Report Generator</h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg leading-7 text-slate-650">
            Generate structured academic event reports with event details, objectives, outcomes, photos, and A4 PDF export.
          </p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/30 to-white p-5 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-xl">{item.icon}</span>
            <div>
              <p className="text-base font-black text-slate-955">{item.label}</p>
              {idx === 4 && statsData.total > 0 && <p className="text-xs text-slate-500 font-semibold">{statsData.total} reports saved</p>}
              {idx === 3 && statsData.draft > 0 && <p className="text-xs text-slate-500 font-semibold">{statsData.draft} report drafts</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-955 tracking-tight">Generator Tools & Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feat, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover-lift flex flex-col justify-between">
              <div>
                <span className="text-3xl">{feat.icon}</span>
                <h3 className="mt-4 text-xl font-black text-slate-955 tracking-tight">{feat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-650">{feat.description}</p>
              </div>
              <div className="mt-6">
                <Link to={feat.link} className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-black rounded-xl text-sm transition-all shadow-sm group-hover:-translate-y-0.5 active:scale-98">
                  <span>{feat.btnText}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Section */}
      <div className="rounded-3xl border border-cyan-100 bg-cyan-50/20 p-7 space-y-6">
        <h2 className="text-2xl font-black text-slate-955 tracking-tight flex items-center gap-2">
          <span>📋</span> Report Workflow
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workflow.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 border border-cyan-50 hover-lift">
              <div className="text-xs font-black uppercase text-cyan-500 tracking-wider font-sans">Step {idx + 1}</div>
              <h4 className="mt-2 text-base font-black text-slate-950 font-sans">{item.step}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReportDashboard;

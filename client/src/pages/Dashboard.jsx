import { Link } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";

const stats = [
  {
    title: "Certificate Templates",
    value: "24+",
    icon: "🎨",
    description: "Ready-to-use designs for academic and professional events."
  },
  {
    title: "Poster Designs",
    value: "12+",
    icon: "🖼️",
    description: "Event poster layouts prepared for poster generation."
  },
  {
    title: "Report Formats",
    value: "A4 Standard",
    icon: "📋",
    description: "Fully structured event reports with outline, objectives, and outcomes."
  },
  {
    title: "Event Reports",
    value: "Structured",
    icon: "📝",
    description: "Create standard A4 reports with detailed field inputs."
  },
  {
    title: "Photo Reports",
    value: "Supported",
    icon: "📸",
    description: "Upload up to 4 event photos with centered bold captions."
  },
  {
    title: "PDF Export",
    value: "Portrait A4",
    icon: "📄",
    description: "Generate print-ready event reports dynamically."
  },
  {
    title: "Report Records",
    value: "Manage",
    icon: "📁",
    description: "View, edit, delete, and download generated report PDFs."
  },
  {
    title: "Bulk Generation",
    value: "Available",
    icon: "📄",
    description: "Generate multiple certificates from manual list or CSV upload."
  },
  {
    title: "Export Tools",
    value: "PDF + ZIP",
    icon: "⬇️",
    description: "Download single documents or complete batches easily."
  }
];

const overviewItems = [
  "24+ certificate templates",
  "Standard A4 event reports",
  "Bulk generation available",
  "PDF and ZIP export ready"
];

const quickActions = [
  { title: "Create Certificate", text: "Build and preview a single certificate.", path: "/create-certificate", icon: "📝" },
  { title: "Create Event Report", text: "Build structured event reports with outlines and lists.", path: "/create-event-report", icon: "📋" },
  { title: "Manage Certificates", text: "Review saved certificates and exports.", path: "/generated-certificates", icon: "🏆" },
  { title: "Manage Event Reports", text: "Review saved reports and draft documents.", path: "/event-reports", icon: "📁" }
];

const capabilities = [
  "Live certificate preview",
  "Live report document preview",
  "Template based design selection",
  "Authorized signature support",
  "PDF export",
  "Bulk CSV generation",
  "ZIP download",
  "Draft management",
  "Edit and delete records"
];

function Dashboard() {
  return (
    <section className="page-transition space-y-7">
      {/* Welcome Banner */}
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-soft lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr] xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Dashboard</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
              Event Document Studio
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Create, manage, export, and organize event certificates and structured reports with professional templates, bulk generation, and live previews.
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
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Studio Modules</p>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50/10 p-6 shadow-md transition hover:shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl shadow-sm">
                🏆
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-950">Event Certificate Generator</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Create certificates, templates, bulk certificates, PDF and ZIP export.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/create-certificate" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-xl text-sm transition">
                Create Certificate
              </Link>
              <Link to="/generated-certificates" className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-xl text-sm transition">
                Manage Certificates
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-cyan-50 via-white to-cyan-50/10 p-6 shadow-md transition hover:shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white text-2xl shadow-sm">
                📋
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-950">Event Report Generator</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Generate structured event reports with event details, objectives, outcomes, photos, and PDF export.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/create-event-report" className="px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 font-bold rounded-xl text-sm transition">
                Create Event Report
              </Link>
              <Link to="/event-reports" className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-xl text-sm transition">
                Manage Event Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delayClass={`delay-${Math.min(index + 1, 4)}00`} />
        ))}
      </div>

      {/* Quick Actions & Capabilities */}
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="slide-up rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Quick Actions</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="card-hover rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {action.icon}
                </span>
                <h3 className="mt-4 text-xl font-black text-slate-950">{action.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{action.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="slide-up delay-100 rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Platform Capabilities</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div key={capability} className="soft-hover flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary-700">
                  ✓
                </span>
                <p className="text-base font-bold text-slate-700">{capability}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;

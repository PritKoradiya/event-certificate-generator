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
    title: "Categories",
    value: "14+",
    icon: "🗂️",
    description: "Seminar, conference, FDP, workshop, hackathon, and more."
  },
  {
    title: "Generated Records",
    value: "Manage",
    icon: "🏆",
    description: "View, edit, delete, download, and organize certificates."
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
    description: "Download single certificates or complete batches easily."
  }
];

const overviewItems = [
  "24+ certificate templates",
  "12+ poster designs",
  "Bulk generation available",
  "PDF and ZIP export ready"
];

const quickActions = [
  { title: "Create New Certificate", text: "Build and preview a single certificate.", path: "/create-certificate", icon: "📝" },
  { title: "Browse Templates", text: "Select certificate and poster designs.", path: "/templates", icon: "🎨" },
  { title: "Bulk Generate Certificates", text: "Create batches from names or CSV files.", path: "/bulk-generate", icon: "📄" },
  { title: "Manage Certificates", text: "Review saved records and exports.", path: "/generated-certificates", icon: "🏆" }
];

const capabilities = [
  "Live certificate preview",
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
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-soft lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr] xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Dashboard</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
              Certificate Management Workspace
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Create, manage, export, and organize event certificates with ready-to-use templates and bulk generation tools.
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

      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delayClass={`delay-${Math.min(index + 1, 4)}00`} />
        ))}
      </div>

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

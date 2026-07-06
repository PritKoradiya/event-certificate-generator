import StatCard from "../components/StatCard.jsx";

const recentDevelopment = [
  "Live certificate preview completed",
  "PDF download completed",
  "MongoDB save completed",
  "20+ templates added"
];

function Dashboard() {
  return (
    <section className="page-transition space-y-6">
      <div className="fade-in rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Dashboard</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Certificate workspace</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Manage certificate templates, poster designs, categories, and generated certificate records from one clean dashboard.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Certificate Templates" value="24+" description="Landscape certificate designs ready for preview and PDF export." />
        <StatCard title="Poster Designs" value="12+" description="Poster gallery cards prepared for upcoming poster generation." />
        <StatCard title="Categories" value="14+" description="Event categories for academic, cultural, sports, and technical use cases." />
        <StatCard title="PDF Download" value="Available" description="Download generated certificate previews as A4 landscape PDFs." />
        <StatCard title="Bulk Generation" value="Coming Soon" description="Generate multiple certificates from a student list later." />
      </div>

      <div className="slide-up rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Recent Development</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {recentDevelopment.map((item) => (
            <div key={item} className="soft-hover rounded-md border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

import StatCard from "../components/StatCard.jsx";

function Dashboard() {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Dashboard</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Certificate workspace</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Manage event certificate templates, categories, and generated certificate records from one clean dashboard.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Templates" value="20+" description="Template selection will be added in upcoming steps." />
        <StatCard title="Categories" value="Seminar, Conference, FDP, Expert Talk" description="Organized certificate categories for college events." />
        <StatCard title="Bulk Generation" value="Coming Soon" description="Generate multiple certificates from a student list later." />
        <StatCard title="PDF Download" value="Coming Soon" description="Download certificate previews as PDF in a future step." />
      </div>
    </section>
  );
}

export default Dashboard;

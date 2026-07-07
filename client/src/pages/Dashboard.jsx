import StatCard from "../components/StatCard.jsx";

const progressItems = [
  "Step 1 Base Setup Done",
  "Step 2 Live Preview Done",
  "Step 3 Template Selection Done",
  "Step 4 MongoDB Save Done",
  "Step 5 PDF Download Done",
  "Step 6 Templates Added",
  "Step 7 Bulk Generation Added"
];

const featureCards = [
  { title: "Live Preview", text: "Certificate changes appear instantly while you type.", icon: "L" },
  { title: "Template Gallery", text: "Choose from academic, technical, cultural, sports, and training styles.", icon: "T" },
  { title: "A4 PDF Export", text: "Generated certificates download in landscape A4 format.", icon: "P" },
  { title: "Bulk Generation", text: "Bulk certificates can be generated from manual list or CSV.", icon: "B" }
];

function Dashboard() {
  return (
    <section className="page-transition space-y-7">
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-soft lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr] xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Dashboard</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
              Certificate workspace for college events
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Manage certificate templates, event categories, saved records, and export-ready previews from one larger, cleaner dashboard.
            </p>
          </div>

          <div className="float-slow rounded-2xl border border-white bg-white/80 p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Current Build</p>
            <p className="mt-2 text-4xl font-black text-primary-700">Step 7</p>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-600">
              Bulk certificate generation from manual list and CSV is available.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Certificate Templates" value="24+" icon="24" delayClass="delay-100" description="Landscape certificate designs ready for preview and PDF export." />
        <StatCard title="Poster Designs" value="12+" icon="12" delayClass="delay-200" description="Poster gallery cards prepared for upcoming poster generation." />
        <StatCard title="Categories" value="14+" icon="14" delayClass="delay-300" description="Event categories for academic, cultural, sports, and technical use cases." />
        <StatCard title="PDF Download" value="Ready" icon="PDF" delayClass="delay-400" description="Download generated previews as optimized A4 landscape PDFs." />
        <StatCard title="Bulk Generation" value="Available" icon="CSV" delayClass="delay-400" description="Generate many certificates from a manual list or a simple CSV file." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="slide-up rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Highlights</p>
          <div className="mt-5 grid gap-4">
            {featureCards.map((feature) => (
              <div key={feature.title} className="soft-hover rounded-xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-base font-black text-primary-700">
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{feature.title}</h3>
                    <p className="mt-1 text-base leading-7 text-slate-600">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slide-up delay-100 rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Progress</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {progressItems.map((item, index) => (
              <div key={item} className="soft-hover flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-base font-bold text-emerald-800">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

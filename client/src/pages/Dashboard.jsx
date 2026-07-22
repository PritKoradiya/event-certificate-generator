import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="page-transition min-h-[calc(100vh-140px)] flex flex-col justify-center py-6">
      {/* Hero Section & Main Module Cards */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50/20 to-purple-50/30 p-8 shadow-soft lg:p-12 animate-hero-fade-in">
        {/* Animated Blobs */}
        <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl animate-float-blob" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-purple-300/15 blur-3xl animate-float-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl animate-float-blob [animation-delay:8s]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-sm font-black uppercase tracking-widest text-primary-650">Workspace Dashboard</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800">
            Event Certificate & Report Generator
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-650 leading-relaxed max-w-3xl mx-auto font-medium">
            A smart MERN stack platform to create event certificates, generate academic event reports, manage records, and export professional PDFs.
          </p>
        </div>

        {/* Two main module option cards */}
        <div className="relative z-10 mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Card 1: Event Certificate Generator */}
          <div className="group relative overflow-hidden rounded-3xl border border-blue-150 bg-white/90 p-8 shadow-lg hover-lift transition-all backdrop-blur-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/25 transition-all duration-300" />
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                🏆
              </div>
              <h3 className="mt-6 text-2xl font-black text-slate-950 font-sans tracking-tight">Event Certificate Generator</h3>
              <p className="mt-3 text-base leading-7 text-slate-650">
                Create single and bulk certificates with templates, live preview, PDF download, ZIP export, and record management.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/certificate-dashboard" className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-black rounded-xl text-base transition-all shadow-md active:scale-98">
                <span>Open Certificate Generator</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Event Report Generator */}
          <div className="group relative overflow-hidden rounded-3xl border border-purple-150 bg-white/90 p-8 shadow-lg hover-lift transition-all backdrop-blur-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-purple-500/10 blur-xl group-hover:bg-purple-500/25 transition-all duration-300" />
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                📋
              </div>
              <h3 className="mt-6 text-2xl font-black text-slate-950 font-sans tracking-tight">Event Report Generator</h3>
              <p className="mt-3 text-base leading-7 text-slate-650">
                Generate structured event reports with event details, objectives, outcomes, photos, and A4 PDF export.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/report-dashboard" className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 font-black rounded-xl text-base transition-all shadow-md active:scale-98">
                <span>Open Report Generator</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

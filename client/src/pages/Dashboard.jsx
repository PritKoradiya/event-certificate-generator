import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardApi.js";

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

  return (
    <section className="page-transition space-y-12 pb-10">
      {errorMessage && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-base font-semibold text-amber-800 shadow-soft animate-fade-in flex items-center gap-3">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hero Section / Welcome Banner */}
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

        {/* Two main option cards */}
        <div className="relative z-10 mt-12 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Card 1: Event Certificate Generator */}
          <div className="group relative overflow-hidden rounded-3xl border border-blue-150 bg-white/80 p-8 shadow-lg hover-lift transition-all backdrop-blur-md flex flex-col justify-between">
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
              <Link to="/create-certificate" className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-black rounded-xl text-base transition-all shadow-md active:scale-98">
                <span>Open Certificate Generator</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Event Report Generator */}
          <div className="group relative overflow-hidden rounded-3xl border border-purple-150 bg-white/80 p-8 shadow-lg hover-lift transition-all backdrop-blur-md flex flex-col justify-between">
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
              <Link to="/create-event-report" className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 font-black rounded-xl text-base transition-all shadow-md active:scale-98">
                <span>Open Report Generator</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="space-y-6 animate-card-slide-up [animation-delay:0.2s]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">About This Project</h2>
          <p className="mt-3 text-lg leading-7 text-slate-600 font-medium">
            This platform is designed for colleges, departments, and event coordinators to manage certificate generation and event report creation from one place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover-lift transition-all flex flex-col justify-between">
            <div>
              <span className="text-3xl">🎓</span>
              <h4 className="mt-4 text-lg font-black text-slate-950">Certificate Creation</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate professional certificates with multiple templates and live preview.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover-lift transition-all flex flex-col justify-between">
            <div>
              <span className="text-3xl">👥</span>
              <h4 className="mt-4 text-lg font-black text-slate-950">Bulk Generation</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Upload or enter multiple participant names and download all certificates together.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover-lift transition-all flex flex-col justify-between">
            <div>
              <span className="text-3xl">📋</span>
              <h4 className="mt-4 text-lg font-black text-slate-950">Event Report Generation</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create mentor-format event reports with event details, objectives, outcomes, and photos.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover-lift transition-all flex flex-col justify-between">
            <div>
              <span className="text-3xl">💾</span>
              <h4 className="mt-4 text-lg font-black text-slate-950">Record Management</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Save, view, edit, delete, and download certificates and reports anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="space-y-6 animate-card-slide-up [animation-delay:0.3s]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">How This Tool Works</h2>
          <p className="mt-2 text-base text-slate-500">Streamlined process workflows for both generation modules.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Certificate Flow */}
          <div className="rounded-3xl border border-blue-100 bg-blue-50/30 p-7 space-y-6">
            <h3 className="text-xl font-black text-blue-900 flex items-center gap-2">
              <span>🏆</span> Event Certificate Flow
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 border border-blue-50 hover-lift">
                <div className="text-sm font-black text-blue-600 font-sans">Select Template</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Choose from 24+ professional designs or background layouts.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-blue-50 hover-lift">
                <div className="text-sm font-black text-blue-600 font-sans">Enter Details</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Fill certificate fields manually or upload a participant list via CSV.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-blue-50 hover-lift">
                <div className="text-sm font-black text-blue-600 font-sans">Preview Certificate</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">See live visual rendering before confirming or exporting.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-blue-50 hover-lift">
                <div className="text-sm font-black text-blue-600 font-sans">Download PDF / ZIP</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Download single certificates as PDF or bulk files inside a ZIP.</p>
              </div>
            </div>
          </div>

          {/* Report Flow */}
          <div className="rounded-3xl border border-purple-100 bg-purple-50/30 p-7 space-y-6">
            <h3 className="text-xl font-black text-purple-900 flex items-center gap-2">
              <span>📋</span> Event Report Flow
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 border border-purple-50 hover-lift">
                <div className="text-sm font-black text-purple-600 font-sans">Enter Event Details</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Enter event coordinators, dates, resource person, and attendees.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-purple-50 hover-lift">
                <div className="text-sm font-black text-purple-600 font-sans">Add Objectives & Outcomes</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Input structured objectives, descriptive outcomes, and outlines.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-purple-50 hover-lift">
                <div className="text-sm font-black text-purple-600 font-sans">Upload Photos</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Attach up to 4 high-quality photos with captions for verification.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-purple-50 hover-lift">
                <div className="text-sm font-black text-purple-600 font-sans">Download Event Report PDF</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">Generate and print the standard 2-page academic portrait PDF.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Modules Table Section */}
      <section className="space-y-6 animate-card-slide-up [animation-delay:0.4s]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Platform Modules</h2>
          <p className="mt-2 text-base text-slate-500">Compare features and outputs of the platform components.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-base font-black text-slate-900">
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Main Purpose</th>
                  <th className="px-6 py-4">Key Features</th>
                  <th className="px-6 py-4">Export Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-5 font-black text-slate-950 flex items-center gap-2">
                    <span className="text-xl">🏆</span> Event Certificate Generator
                  </td>
                  <td className="px-6 py-5 font-bold">Generate event certificates</td>
                  <td className="px-6 py-5">Templates, bulk generation, live preview, record management</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-black uppercase">
                      PDF, ZIP
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-5 font-black text-slate-950 flex items-center gap-2">
                    <span className="text-xl">📋</span> Event Report Generator
                  </td>
                  <td className="px-6 py-5 font-bold">Generate academic event reports</td>
                  <td className="px-6 py-5">Event details, objectives, outcomes, photos, report records</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-black uppercase">
                      A4 PDF
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="space-y-6 animate-card-slide-up [animation-delay:0.5s]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Workspace Highlights</h2>
          <p className="mt-2 text-base text-slate-500">Key metrics and features of the documentation platform.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white p-6 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl">🎓</span>
            <div>
              <h4 className="text-2xl font-black text-slate-950">24+</h4>
              <p className="text-sm font-semibold text-slate-500">Certificate Templates</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/50 to-white p-6 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-2xl">🖼️</span>
            <div>
              <h4 className="text-2xl font-black text-slate-950">12+</h4>
              <p className="text-sm font-semibold text-slate-500">Poster Designs</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/50 to-white p-6 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-2xl">⚡</span>
            <div>
              <h4 className="text-2xl font-black text-slate-950">2</h4>
              <p className="text-sm font-semibold text-slate-500">Main Modules</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-6 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">📥</span>
            <div>
              <h4 className="text-2xl font-black text-slate-950">Ready</h4>
              <p className="text-sm font-semibold text-slate-500">PDF Export Ready</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/50 to-white p-6 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">📦</span>
            <div>
              <h4 className="text-2xl font-black text-slate-950">Ready</h4>
              <p className="text-sm font-semibold text-slate-500">ZIP Export Ready</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/50 to-white p-6 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-2xl">⚡</span>
            <div>
              <h4 className="text-2xl font-black text-slate-950">Active</h4>
              <p className="text-sm font-semibold text-slate-500">Photo Report Support</p>
            </div>
          </div>
        </div>

        {/* Real-time stats display from API */}
        {!errorMessage && statsData.certificates.total > 0 && (
          <div className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-bold text-slate-600 border border-slate-200">
            📊 Current system load: {statsData.certificates.total} certificates generated, {statsData.eventReports.total} event reports managed.
          </div>
        )}
      </section>

      {/* Quick Actions Section */}
      <section className="space-y-6 animate-card-slide-up [animation-delay:0.6s]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Quick Actions</h2>
          <p className="mt-2 text-base text-slate-500">Instantly launch generators or manage records from here.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <Link to="/create-certificate" className="group rounded-2xl border border-blue-200 bg-blue-50/20 p-5 hover-lift transition-all flex items-center justify-between">
            <span className="font-black text-blue-900 group-hover:text-blue-700 transition">Create Certificate</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>

          <Link to="/templates" className="group rounded-2xl border border-sky-200 bg-sky-50/20 p-5 hover-lift transition-all flex items-center justify-between">
            <span className="font-black text-sky-900 group-hover:text-sky-700 transition">Browse Templates</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>

          <Link to="/bulk-generate" className="group rounded-2xl border border-indigo-200 bg-indigo-50/20 p-5 hover-lift transition-all flex items-center justify-between">
            <span className="font-black text-indigo-900 group-hover:text-indigo-700 transition">Bulk Generate</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>

          <Link to="/generated-certificates" className="group rounded-2xl border border-slate-200 bg-slate-100/40 p-5 hover-lift transition-all flex items-center justify-between">
            <span className="font-black text-slate-900 group-hover:text-slate-700 transition">Manage Certificates</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>

          <Link to="/create-event-report" className="group rounded-2xl border border-purple-200 bg-purple-50/20 p-5 hover-lift transition-all flex items-center justify-between">
            <span className="font-black text-purple-900 group-hover:text-purple-700 transition">Create Event Report</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>

          <Link to="/event-reports" className="group rounded-2xl border border-pink-200 bg-pink-50/20 p-5 hover-lift transition-all flex items-center justify-between">
            <span className="font-black text-pink-900 group-hover:text-pink-700 transition">Manage Event Reports</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Dashboard;

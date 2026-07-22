import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardApi.js";

function CertificateDashboard() {
  const [statsData, setStatsData] = useState({
    total: 0,
    generated: 0,
    draft: 0,
    single: 0,
    bulk: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStats();
        if (result.success && result.data && result.data.certificates) {
          setStatsData(result.data.certificates);
        }
      } catch (error) {
        console.error("Failed to load certificate stats:", error);
      }
    };
    fetchStats();
  }, []);

  const features = [
    {
      title: "Create Certificate",
      description: "Create a certificate with participant and event details.",
      btnText: "Create Certificate",
      link: "/create-certificate",
      icon: "📝"
    },
    {
      title: "Template Gallery",
      description: "Choose from certificate templates and image background designs.",
      btnText: "Browse Templates",
      link: "/templates",
      icon: "🎨"
    },
    {
      title: "Categories",
      description: "Organize certificates by seminar, conference, FDP, workshop, hackathon, and more.",
      btnText: "View Categories",
      link: "/categories",
      icon: "🗂️"
    },
    {
      title: "Bulk Generate",
      description: "Generate multiple certificates from manual list or CSV upload.",
      btnText: "Bulk Generate",
      link: "/bulk-generate",
      icon: "📄"
    },
    {
      title: "Generated Certificates",
      description: "View, edit, delete, and download saved certificate records.",
      btnText: "Manage Certificates",
      link: "/generated-certificates",
      icon: "🏆"
    },
    {
      title: "Export Tools",
      description: "Download single PDFs and bulk ZIP files.",
      btnText: "Manage Exports",
      link: "/generated-certificates",
      icon: "📦"
    }
  ];

  const stats = [
    { label: "24+ Certificate Templates", icon: "🎓" },
    { label: "PDF Export Ready", icon: "📥" },
    { label: "ZIP Export Ready", icon: "📦" },
    { label: "Bulk Generation", icon: "⚡" },
    { label: "Draft Management", icon: "💾" },
    { label: "Record Management", icon: "🗂️" }
  ];

  const workflow = [
    { step: "Select Template", desc: "Choose from 24+ professional designs or background layouts." },
    { step: "Enter Details", desc: "Fill certificate fields manually or upload a participant list via CSV." },
    { step: "Preview Certificate", desc: "See live visual rendering before confirming or exporting." },
    { step: "Generate PDF", desc: "Download single certificates as PDF or bulk files inside a ZIP." },
    { step: "Manage Records", desc: "Save drafts, edit details, or delete records from the platform." }
  ];

  return (
    <section className="page-transition space-y-10 pb-10">
      {/* Back Link */}
      <div>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-primary-600 hover:text-primary-800 transition">
          <span>←</span>
          <span>Go to Main Dashboard</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-8 shadow-soft lg:p-10 animate-hero-fade-in">
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl animate-float-blob" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-purple-500/10 blur-2xl animate-float-blob [animation-delay:4s]" />

        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-wider text-primary-600">Module Workspace</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-950">Event Certificate Generator</h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg leading-7 text-slate-600">
            Create, manage, preview, and export professional event certificates using templates and bulk tools.
          </p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/30 to-white p-5 shadow-sm hover-lift flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">{item.icon}</span>
            <div>
              <p className="text-base font-black text-slate-950">{item.label}</p>
              {idx === 0 && <p className="text-xs text-slate-500 font-semibold">24+ beautiful designs available</p>}
              {idx === 3 && statsData.total > 0 && <p className="text-xs text-slate-500 font-semibold">{statsData.total} generated overall</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">Generator Tools & Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover-lift flex flex-col justify-between">
              <div>
                <span className="text-3xl">{feat.icon}</span>
                <h3 className="mt-4 text-xl font-black text-slate-950 tracking-tight">{feat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-650">{feat.description}</p>
              </div>
              <div className="mt-6">
                <Link to={feat.link} className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-primary-700 font-black rounded-xl text-sm transition-all shadow-sm group-hover:-translate-y-0.5 active:scale-98">
                  <span>{feat.btnText}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Section */}
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50/20 p-7 space-y-6">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
          <span>🏆</span> Certificate Workflow
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workflow.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 border border-indigo-50 hover-lift">
              <div className="text-xs font-black uppercase text-indigo-500 tracking-wider">Step {idx + 1}</div>
              <h4 className="mt-2 text-base font-black text-slate-950">{item.step}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificateDashboard;

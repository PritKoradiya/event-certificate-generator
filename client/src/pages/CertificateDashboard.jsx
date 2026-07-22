import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModuleHeader from "../components/ui/ModuleHeader.jsx";
import FeatureCard from "../components/ui/FeatureCard.jsx";
import PageHero from "../components/ui/PageHero.jsx";
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

  const featureCards = [
    {
      title: "Certificate Builder",
      description: "Design custom certificates with participant details, event dates, and live visual preview.",
      btnText: "Open Builder",
      to: "/create-certificate",
      icon: "📝",
      badge: "Popular"
    },
    {
      title: "Template Gallery",
      description: "Browse 24+ professional designs, ornate frames, and customizable background templates.",
      btnText: "Explore Gallery",
      to: "/templates",
      icon: "🎨",
      badge: "24+ Styles"
    },
    {
      title: "Event Categories",
      description: "Filter designs tailored for seminars, conferences, hackathons, FDPs, and workshops.",
      btnText: "View Categories",
      to: "/categories",
      icon: "🗂️",
      badge: "14 Categories"
    },
    {
      title: "Bulk Generation",
      description: "Generate dozens or hundreds of certificates at once using CSV spreadsheet upload.",
      btnText: "Bulk Studio",
      to: "/bulk-generate",
      icon: "📄",
      badge: "CSV Upload"
    },
    {
      title: "Certificate Records",
      description: "Search, filter, view, edit details, or delete saved certificate records anytime.",
      btnText: "Manage Records",
      to: "/generated-certificates",
      icon: "🏆",
      badge: `${statsData.total || "All"} Records`
    },
    {
      title: "Export Center",
      description: "Download single certificates as crisp PDFs or export batch runs in compressed ZIP files.",
      btnText: "Export Tools",
      to: "/generated-certificates",
      icon: "📦",
      badge: "PDF & ZIP"
    }
  ];

  const capabilities = [
    "Single Certificate",
    "Bulk CSV Processing",
    "PDF Export",
    "ZIP Export",
    "Draft Management",
    "Image Background Templates"
  ];

  return (
    <section className="space-y-8 pb-10">
      {/* Top Module Header */}
      <ModuleHeader
        title="Certificate Studio"
        subtitle="Professional certificate creation workspace"
        theme="certificate"
        badge="Certificate Module"
        primaryAction={{
          label: "Create Certificate",
          to: "/create-certificate"
        }}
      />

      {/* Hero Section */}
      <PageHero
        tag="CERTIFICATE WORKSPACE"
        title="Build certificates that look official, polished, and ready to share."
        subtitle="Select a design, enter participant details, preview instantly, and export as PDF—or generate complete batches from CSV."
        theme="blue"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/create-certificate"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-md transition hover:bg-blue-700 active:scale-98"
          >
            <span>Create Certificate</span>
            <span>→</span>
          </Link>
          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-6 py-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-98"
          >
            <span>Browse Templates</span>
          </Link>
        </div>
      </PageHero>

      {/* Capability Strip */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-blue-50/50 p-4 backdrop-blur-md shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
          <span className="text-blue-600 font-extrabold uppercase tracking-wider">Features:</span>
          {capabilities.map((cap) => (
            <span key={cap} className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 shadow-2xs border border-blue-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Feature Tools Grid (6 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight font-sans">
            Certificate Generator Tools
          </h2>
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            6 Specialized Modules
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} theme="blue" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificateDashboard;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import MainDashboardButton from "./MainDashboardButton.jsx";

const certificateNavItems = [
  { name: "Overview", path: "/certificate-dashboard" },
  { name: "Create Certificate", path: "/create-certificate" },
  { name: "Templates", path: "/templates" },
  { name: "Categories", path: "/categories" },
  { name: "Bulk Generate", path: "/bulk-generate" },
  { name: "Certificate Records", path: "/generated-certificates" }
];

const reportNavItems = [
  { name: "Overview", path: "/report-dashboard" },
  { name: "Create Event Report", path: "/create-event-report" },
  { name: "Event Report Records", path: "/event-reports" }
];

function MobileModuleNavigation({ module = "certificate" }) {
  const [isOpen, setIsOpen] = useState(false);

  const isCertificate = module === "certificate";
  const items = isCertificate ? certificateNavItems : reportNavItems;
  const title = isCertificate ? "Certificate Studio" : "Report Studio";
  const badgeBg = isCertificate ? "bg-blue-600" : "bg-purple-600";
  const activeClass = isCertificate
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white";

  return (
    <div className="lg:hidden w-full mb-4">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-md backdrop-blur-lg">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${badgeBg} text-white font-black text-xs shadow-sm`}>
            {isCertificate ? "CS" : "RS"}
          </span>
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-none">{title}</h2>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Workspace Navigation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MainDashboardButton className="!px-3 !py-1.5 !text-xs" />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl space-y-2 animate-hero-fade-in">
          <p className="px-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            {title} Menu
          </p>
          <nav className="grid gap-1">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? activeClass
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                <span>{item.name}</span>
                <span className="text-xs opacity-70">→</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileModuleNavigation;

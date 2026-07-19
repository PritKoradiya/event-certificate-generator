import { NavLink } from "react-router-dom";

const certificateItems = [
  { name: "Create Certificate", path: "/create-certificate", icon: "📝" },
  { name: "Templates", path: "/templates", icon: "🎨" },
  { name: "Categories", path: "/categories", icon: "🗂️" },
  { name: "Bulk Generate", path: "/bulk-generate", icon: "📄" },
  { name: "Generated Certificates", path: "/generated-certificates", icon: "🏆" }
];

const reportItems = [
  { name: "Create Event Report", path: "/create-event-report", icon: "📋" },
  { name: "Event Reports", path: "/event-reports", icon: "📁" }
];

function Sidebar() {
  const renderLink = (item) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `sidebar-link flex items-center gap-3 rounded-xl px-4 py-2.5 text-base font-bold transition ${
          isActive
            ? "bg-gradient-to-r from-primary-600 to-sky-500 text-white shadow-lg shadow-blue-200"
            : "text-slate-600 hover:bg-blue-50 hover:text-primary-700"
        }`
      }
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-lg">
        {item.icon}
      </span>
      <span>{item.name}</span>
    </NavLink>
  );

  return (
    <aside className="fade-in w-full shrink-0 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-soft lg:sticky lg:top-28 lg:w-[286px] lg:self-start">
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5">
        <p className="text-xl font-black text-slate-950">Document Studio</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">Event document tools</p>
      </div>
      <nav className="grid gap-4">
        {/* Main Section */}
        <div>
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Main
          </p>
          <div className="grid gap-1">
            {renderLink({ name: "Dashboard", path: "/", icon: "🏠" })}
          </div>
        </div>

        {/* Certificate Tools Section */}
        <div>
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Certificate Tools
          </p>
          <div className="grid gap-1">
            {certificateItems.map(renderLink)}
          </div>
        </div>

        {/* Report Tools Section */}
        <div>
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Report Tools
          </p>
          <div className="grid gap-1">
            {reportItems.map(renderLink)}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

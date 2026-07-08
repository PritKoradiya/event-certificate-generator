import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/", icon: "🏠" },
  { name: "Create Certificate", path: "/create-certificate", icon: "📝" },
  { name: "Templates", path: "/templates", icon: "🎨" },
  { name: "Categories", path: "/categories", icon: "🗂️" },
  { name: "Bulk Generate", path: "/bulk-generate", icon: "📄" },
  { name: "Generated Certificates", path: "/generated-certificates", icon: "🏆" }
];

function Sidebar() {
  return (
    <aside className="fade-in w-full shrink-0 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-soft lg:sticky lg:top-28 lg:w-[286px] lg:self-start">
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5">
        <p className="text-xl font-black text-slate-950">Certificate Studio</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">Event document tools</p>
      </div>
      <nav className="grid gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-bold transition ${
                isActive
                  ? "bg-gradient-to-r from-primary-600 to-sky-500 text-white shadow-lg shadow-blue-200"
                  : "text-slate-600 hover:bg-blue-50 hover:text-primary-700"
              }`
            }
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-lg">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

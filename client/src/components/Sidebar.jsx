import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/", icon: "D" },
  { name: "Create Certificate", path: "/create-certificate", icon: "C" },
  { name: "Templates", path: "/templates", icon: "T" },
  { name: "Categories", path: "/categories", icon: "G" },
  { name: "Bulk Generate", path: "/bulk-generate", icon: "B" },
  { name: "Generated Certificates", path: "/generated-certificates", icon: "R" }
];

function Sidebar() {
  return (
    <aside className="fade-in w-full shrink-0 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-soft lg:sticky lg:top-28 lg:w-[270px] lg:self-start">
      <div className="mb-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-primary-600">Workspace</p>
        <p className="mt-1 text-lg font-black text-slate-950">Certificate Studio</p>
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
                  : "text-slate-600 hover:bg-primary-50 hover:text-primary-700"
              }`
            }
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 text-sm font-black">
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

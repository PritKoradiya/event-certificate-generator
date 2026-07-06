import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Create Certificate", path: "/create-certificate" },
  { name: "Templates", path: "/templates" },
  { name: "Categories", path: "/categories" },
  { name: "Bulk Generate", path: "/bulk-generate" },
  { name: "Generated Certificates", path: "/generated-certificates" }
];

function Sidebar() {
  return (
    <aside className="fade-in w-full shrink-0 rounded-lg border border-slate-200 bg-white p-3 shadow-soft md:w-64">
      <nav className="grid gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-md border px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-primary-100 bg-primary-50 text-primary-700 shadow-sm"
                  : "border-transparent text-slate-600 hover:border-primary-100 hover:bg-primary-50 hover:text-primary-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

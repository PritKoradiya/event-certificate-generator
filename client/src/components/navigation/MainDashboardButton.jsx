import { Link } from "react-router-dom";

function MainDashboardButton({ className = "" }) {
  return (
    <Link
      to="/"
      className={`group relative inline-flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-md active:translate-y-0 active:scale-98 ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l1.293 1.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </span>
      <span>Main Dashboard</span>
    </Link>
  );
}

export default MainDashboardButton;

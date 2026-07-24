import { Link } from "react-router-dom";
import { brandingData } from "../data/brandingData.js";

const footerLinks = [
  { label: "Main Dashboard", path: "/" },
  { label: "Certificate Studio", path: "/certificate-dashboard" },
  { label: "Poster Studio", path: "/create-poster" },
  { label: "Report Studio", path: "/report-dashboard" },
  { label: "Attendance Studio", path: "/attendance-dashboard" },
  { label: "Student Master List", path: "/student-list" }
];

function Footer() {
  return (
    <footer className="footer-fade-up mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-[1px] shadow-xl">
      <div className="footer-gradient-line h-1 w-full" />
      <div className="rounded-[1.35rem] bg-white/90 px-5 py-7 text-slate-700 backdrop-blur sm:px-7 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <section>
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              {brandingData.appName}
            </h2>
            <p className="mt-3 max-w-sm text-xs sm:text-sm font-semibold leading-relaxed text-slate-500">
              {brandingData.subtitle}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-primary-700">
              Quick Links
            </h3>
            <nav className="mt-4 grid gap-2 text-sm font-bold sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="footer-link w-fit text-slate-600 transition hover:text-primary-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-primary-700">
              Developed By
            </h3>
            <p className="footer-developer-name mt-4 w-fit text-lg font-black text-slate-950 transition">
              {brandingData.developerName}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Developed by {brandingData.developerName}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-black">
              <a
                href="#"
                className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-primary-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-100"
              >
                GitHub
              </a>
              <a
                href="#"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-primary-700"
              >
                Portfolio
              </a>
            </div>
          </section>
        </div>

        <div className="mt-8 border-t border-blue-100 pt-5 text-sm font-semibold text-slate-500">
          <p className="text-base font-black text-slate-900">
            {brandingData.appName}
          </p>
          <p className="mt-1 font-semibold text-slate-600">
            {brandingData.subtitle}
          </p>
          <p className="mt-2 text-slate-700">
            Developed by {brandingData.developerName}
          </p>
          <p className="mt-1">
            &copy; {brandingData.copyrightYear} {brandingData.developerName}. {brandingData.rightsText}
          </p>
          <p className="mt-1 text-slate-600">{brandingData.protectionText}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

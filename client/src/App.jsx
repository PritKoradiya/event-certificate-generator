import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CertificateDashboard from "./pages/CertificateDashboard.jsx";
import ReportDashboard from "./pages/ReportDashboard.jsx";
import CreateCertificate from "./pages/CreateCertificate.jsx";
import Templates from "./pages/Templates.jsx";
import Categories from "./pages/Categories.jsx";
import BulkGenerate from "./pages/BulkGenerate.jsx";
import GeneratedCertificates from "./pages/GeneratedCertificates.jsx";
import CreateEventReport from "./pages/CreateEventReport.jsx";
import EventReports from "./pages/EventReports.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-base text-slate-900">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-5 lg:flex-row lg:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/certificate-dashboard" element={<CertificateDashboard />} />
              <Route path="/report-dashboard" element={<ReportDashboard />} />
              <Route path="/create-certificate" element={<CreateCertificate />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/bulk-generate" element={<BulkGenerate />} />
              <Route path="/generated-certificates" element={<GeneratedCertificates />} />
              <Route path="/create-event-report" element={<CreateEventReport />} />
              <Route path="/event-reports" element={<EventReports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;

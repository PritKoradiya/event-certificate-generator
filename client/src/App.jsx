import { Navigate, Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout.jsx";
import CertificateLayout from "./layouts/CertificateLayout.jsx";
import ReportLayout from "./layouts/ReportLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import CertificateDashboard from "./pages/CertificateDashboard.jsx";
import ReportDashboard from "./pages/ReportDashboard.jsx";
import CreateCertificate from "./pages/CreateCertificate.jsx";
import Templates from "./pages/Templates.jsx";
import Categories from "./pages/Categories.jsx";
import BulkGenerate from "./pages/BulkGenerate.jsx";
import GeneratedCertificates from "./pages/GeneratedCertificates.jsx";
import CreatePoster from "./pages/CreatePoster.jsx";
import PosterRecords from "./pages/PosterRecords.jsx";
import CreateEventReport from "./pages/CreateEventReport.jsx";
import EventReports from "./pages/EventReports.jsx";

function App() {
  return (
    <Routes>
      {/* 1. Public Landing Layout */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      {/* 2. Certificate Module Layout */}
      <Route element={<CertificateLayout />}>
        <Route path="/certificate-dashboard" element={<CertificateDashboard />} />
        <Route path="/create-certificate" element={<CreateCertificate />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/bulk-generate" element={<BulkGenerate />} />
        <Route path="/generated-certificates" element={<GeneratedCertificates />} />
        <Route path="/create-poster" element={<CreatePoster />} />
        <Route path="/poster-records" element={<PosterRecords />} />
      </Route>

      {/* 3. Report Module Layout */}
      <Route element={<ReportLayout />}>
        <Route path="/report-dashboard" element={<ReportDashboard />} />
        <Route path="/create-event-report" element={<CreateEventReport />} />
        <Route path="/event-reports" element={<EventReports />} />
      </Route>

      {/* Catch-all redirect to Landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

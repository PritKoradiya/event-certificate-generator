import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateCertificate from "./pages/CreateCertificate.jsx";
import Templates from "./pages/Templates.jsx";
import Categories from "./pages/Categories.jsx";
import BulkGenerate from "./pages/BulkGenerate.jsx";
import GeneratedCertificates from "./pages/GeneratedCertificates.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-certificate" element={<CreateCertificate />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/bulk-generate" element={<BulkGenerate />} />
            <Route path="/generated-certificates" element={<GeneratedCertificates />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

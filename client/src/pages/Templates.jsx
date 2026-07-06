import { useNavigate } from "react-router-dom";
import templateData from "../data/templateData.js";

function Templates() {
  const navigate = useNavigate();

  const handleUseTemplate = (templateName) => {
    localStorage.setItem("selectedCertificateTemplate", templateName);
    alert("Template selected successfully.");
    navigate("/create-certificate");
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Templates</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Certificate designs</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {templateData.map((template) => (
          <div key={template.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className={`flex h-32 items-center justify-center rounded-md border-2 ${template.previewClass}`}>
              <div className="w-4/5 text-center">
                <div className={`mx-auto mb-4 h-1 w-20 rounded-full ${template.accentClass}`} />
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Certificate</p>
                <div className="mx-auto mt-3 h-2 w-28 rounded-full bg-white/80" />
                <div className="mx-auto mt-2 h-2 w-20 rounded-full bg-white/80" />
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-950">{template.name}</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {template.category}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">{template.description}</p>

            <button
              type="button"
              onClick={() => handleUseTemplate(template.name)}
              className="mt-4 w-full rounded-md bg-primary-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Templates;

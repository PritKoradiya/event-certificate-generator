import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import posterData from "../data/posterData.js";
import templateData from "../data/templateData.js";

const categories = [
  "All",
  "Seminar",
  "Conference",
  "FDP",
  "Expert Talk",
  "Workshop",
  "Webinar",
  "Hackathon",
  "Training",
  "Competition",
  "Appreciation",
  "Academic",
  "Cultural",
  "Sports",
  "Technical"
];

function CertificateMiniPreview({ template }) {
  return (
    <div className={`flex aspect-[11/8] items-center justify-center rounded-md border-2 p-3 ${template.previewClass}`}>
      <div className={`h-full w-full rounded border bg-white/70 p-3 text-center ${template.borderClass}`}>
        <div className={`mx-auto h-1 w-20 rounded-full ${template.accentClass}`} />
        <p className={`mt-3 text-xs font-bold uppercase ${template.headingClass}`}>Certificate</p>
        <div className="mx-auto mt-4 h-2 w-28 rounded-full bg-white" />
        <div className="mx-auto mt-2 h-2 w-20 rounded-full bg-white" />
        <div className="mt-6 flex justify-between gap-3">
          <div className="h-px flex-1 bg-slate-300" />
          <div className="h-px flex-1 bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function PosterMiniPreview({ poster }) {
  return (
    <div className={`mx-auto flex aspect-[3/4] max-h-56 w-full max-w-40 items-center justify-center rounded-md border-2 p-3 ${poster.previewClass}`}>
      <div className="flex h-full w-full flex-col justify-between rounded bg-white/75 p-3 text-center">
        <div className={`mx-auto h-1 w-14 rounded-full ${poster.accentClass}`} />
        <div>
          <p className="text-xs font-bold uppercase text-slate-800">Event Title</p>
          <div className="mx-auto mt-3 h-2 w-20 rounded-full bg-slate-200" />
          <div className="mx-auto mt-2 h-2 w-14 rounded-full bg-slate-200" />
        </div>
        <div className="space-y-2">
          <div className="mx-auto h-2 w-24 rounded-full bg-white" />
          <div className="mx-auto h-2 w-20 rounded-full bg-white" />
          <div className={`mx-auto h-5 w-20 rounded-full ${poster.accentClass}`} />
        </div>
      </div>
    </div>
  );
}

function Templates() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("certificate");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedTemplateCategory");

    if (savedCategory) {
      setSelectedCategory(savedCategory);
      localStorage.removeItem("selectedTemplateCategory");
    }
  }, []);

  const activeItems = activeTab === "certificate" ? templateData : posterData;

  const filteredItems = useMemo(() => {
    return activeItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeItems, searchTerm, selectedCategory]);

  const handleUseTemplate = (templateName) => {
    localStorage.setItem("selectedCertificateTemplate", templateName);
    alert("Certificate template selected successfully.");
    navigate("/create-certificate");
  };

  const handleUsePoster = () => {
    alert("Poster generation feature will be added in upcoming steps.");
  };

  const itemLabel = activeTab === "certificate" ? "certificate templates" : "poster designs";

  return (
    <section className="page-transition space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Templates</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Design gallery</h2>
        <p className="mt-2 text-slate-600">Choose certificate templates now, and preview poster designs for upcoming steps.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("certificate")}
              className={`soft-hover rounded-md px-4 py-2 text-sm font-bold transition ${activeTab === "certificate" ? "bg-white text-primary-700 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            >
              Certificate Templates
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("poster")}
              className={`soft-hover rounded-md px-4 py-2 text-sm font-bold transition ${activeTab === "poster" ? "bg-white text-primary-700 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            >
              Poster Designs
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_220px] lg:min-w-[520px]">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by template name"
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-600">
          Showing {filteredItems.length} {itemLabel}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="card-hover rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            {activeTab === "certificate" ? <CertificateMiniPreview template={item} /> : <PosterMiniPreview poster={item} />}

            <div className="mt-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.badgeClass}`}>
                {item.category}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>

            <button
              type="button"
              onClick={() => (activeTab === "certificate" ? handleUseTemplate(item.name) : handleUsePoster())}
              className="soft-hover mt-4 w-full rounded-md bg-primary-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
            >
              {activeTab === "certificate" ? "Use Template" : "Use Poster"}
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <p className="text-sm font-semibold text-slate-600">No designs matched your filters.</p>
        </div>
      )}
    </section>
  );
}

export default Templates;

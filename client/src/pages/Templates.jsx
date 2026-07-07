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
    <div className={`flex aspect-[1.414/1] items-center justify-center rounded-xl border-2 p-3 ${template.previewClass}`}>
      <div className={`flex h-full w-full flex-col justify-between rounded-lg border bg-white/85 p-4 text-center ${template.borderClass}`}>
        <div className={`mx-auto h-1.5 w-28 rounded-full ${template.accentClass}`} />
        <div>
          <p className={`text-lg font-black uppercase ${template.headingClass}`}>Certificate</p>
          <div className="mx-auto mt-3 h-2.5 w-36 rounded-full bg-slate-200" />
          <div className="mx-auto mt-2 h-2.5 w-24 rounded-full bg-slate-200" />
        </div>
        <div className="grid grid-cols-3 items-end gap-4">
          <div className="h-px bg-slate-300" />
          <div className={`mx-auto h-12 w-12 rounded-full border-2 ${template.borderClass}`} />
          <div className="h-px bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function PosterMiniPreview({ poster }) {
  return (
    <div className={`mx-auto flex aspect-[3/4] max-h-72 w-full max-w-52 items-center justify-center rounded-xl border-2 p-3 ${poster.previewClass}`}>
      <div className="flex h-full w-full flex-col justify-between rounded-lg bg-white/80 p-4 text-center">
        <div className={`mx-auto h-1.5 w-16 rounded-full ${poster.accentClass}`} />
        <div>
          <p className="text-base font-black uppercase text-slate-800">Event Title</p>
          <div className="mx-auto mt-4 h-2.5 w-24 rounded-full bg-slate-200" />
          <div className="mx-auto mt-2 h-2.5 w-16 rounded-full bg-slate-200" />
        </div>
        <div className="space-y-2">
          <div className="mx-auto h-2.5 w-28 rounded-full bg-slate-100" />
          <div className="mx-auto h-2.5 w-20 rounded-full bg-slate-100" />
          <div className={`mx-auto h-7 w-24 rounded-full ${poster.accentClass}`} />
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
    <section className="page-transition space-y-7">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Templates</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Design gallery</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">Choose certificate templates now, and preview poster designs for upcoming steps.</p>
      </div>

      <div className="sticky top-24 z-20 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("certificate")}
              className={`button-press soft-hover rounded-full px-5 py-3 text-base font-black transition ${activeTab === "certificate" ? "bg-white text-primary-700 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            >
              Certificate
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("poster")}
              className={`button-press soft-hover rounded-full px-5 py-3 text-base font-black transition ${activeTab === "poster" ? "bg-white text-primary-700 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            >
              Poster
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_240px] xl:min-w-[620px]">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by template name"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-base font-bold text-slate-600">
          Showing {filteredItems.length} {itemLabel}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            {activeTab === "certificate" ? <CertificateMiniPreview template={item} /> : <PosterMiniPreview poster={item} />}

            <div className="mt-5 flex items-start justify-between gap-3">
              <h3 className="text-xl font-black text-slate-950">{item.name}</h3>
              <span className={`rounded-full px-3 py-1.5 text-xs font-black ${item.badgeClass}`}>
                {item.category}
              </span>
            </div>

            <p className="mt-3 text-base leading-7 text-slate-500">{item.description}</p>

            <button
              type="button"
              onClick={() => (activeTab === "certificate" ? handleUseTemplate(item.name) : handleUsePoster())}
              className="button-press soft-hover mt-5 w-full rounded-xl bg-primary-600 px-4 py-3 text-base font-black text-white transition hover:bg-primary-700"
            >
              {activeTab === "certificate" ? "Use Template" : "Use Poster"}
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-soft">
          <p className="text-base font-bold text-slate-600">No designs matched your filters.</p>
        </div>
      )}
    </section>
  );
}

export default Templates;

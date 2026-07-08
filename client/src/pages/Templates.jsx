import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import posterData from "../data/posterData.js";
import templateData from "../data/templateData.js";
import templateConfigs from "../components/templates/templateConfigs.js";

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

const designConfigMap = {
  "academic-seal": templateConfigs.academicSeal,
  "blue-corporate": templateConfigs.blueCorporate,
  "classic-ornate": templateConfigs.classicOrnate,
  "dark-luxury": templateConfigs.darkLuxury,
  "floral-creative": templateConfigs.floralCreative,
  "gold-corner": templateConfigs.goldCorner,
  "minimal-elegant": templateConfigs.minimalElegant,
  "modern-wave": templateConfigs.modernWave,
  "playful-award": templateConfigs.playfulAward,
  "vintage-border": templateConfigs.vintageBorder
};

function MiniCornerOrnaments({ color, softColor }) {
  return (
    <>
      {["left-2 top-2", "right-2 top-2 rotate-90", "bottom-2 right-2 rotate-180", "bottom-2 left-2 -rotate-90"].map((position) => (
        <svg key={position} className={`absolute h-12 w-12 ${position}`} viewBox="0 0 100 100" aria-hidden="true">
          <path d="M10 90 C16 47 47 16 90 10" fill="none" stroke={color} strokeWidth="5" />
          <path d="M25 84 C31 58 58 31 84 25" fill="none" stroke={color} strokeWidth="2.5" />
          <circle cx="35" cy="72" r="6" fill={softColor} stroke={color} strokeWidth="2" />
        </svg>
      ))}
    </>
  );
}

function MiniWave({ primary, secondary }) {
  return (
    <>
      <svg className="absolute right-0 top-0 h-20 w-36" viewBox="0 0 180 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M35 0 H180 V72 C136 88 104 73 78 48 C58 28 47 13 35 0Z" fill={primary} opacity="0.88" />
        <path d="M82 0 H180 V38 C143 51 117 42 99 25 C91 17 86 8 82 0Z" fill={secondary} opacity="0.84" />
      </svg>
      <svg className="absolute bottom-0 left-0 h-16 w-36" viewBox="0 0 180 76" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 18 C40 2 74 15 102 39 C124 59 146 68 180 58 V76 H0Z" fill={primary} opacity="0.15" />
      </svg>
    </>
  );
}

function MiniFloral() {
  return (
    <>
      {["left-3 top-3", "right-3 bottom-3 rotate-180"].map((position) => (
        <svg key={position} className={`absolute h-20 w-20 ${position}`} viewBox="0 0 120 110" aria-hidden="true">
          <path d="M16 93 C40 60 64 35 102 14" fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
          <circle cx="44" cy="68" r="12" fill="#f97316" opacity="0.84" />
          <circle cx="70" cy="45" r="12" fill="#14b8a6" opacity="0.84" />
          <circle cx="92" cy="26" r="10" fill="#fb923c" opacity="0.84" />
        </svg>
      ))}
    </>
  );
}

function MiniPlayful() {
  return (
    <>
      <div className="absolute left-6 top-5 h-9 w-9 rotate-12 rounded-lg bg-sky-300/35" />
      <div className="absolute right-7 top-7 h-12 w-12 rounded-full bg-orange-300/35" />
      <div className="absolute bottom-6 left-9 h-0 w-0 border-l-[18px] border-r-[18px] border-t-[32px] border-l-transparent border-r-transparent border-t-yellow-300/50" />
      <div className="absolute bottom-8 right-10 h-9 w-7 -rotate-12 bg-teal-300/35" />
    </>
  );
}

function PremiumCertificateMiniPreview({ template }) {
  const config = designConfigMap[template.designKey] || templateConfigs.blueCorporate;
  const dark = config.dark;

  return (
    <div className="aspect-[1.414/1] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
      <div className="relative h-full w-full overflow-hidden border" style={{ background: config.background, borderColor: config.borderColor }}>
        {(config.decoration === "ornate" || config.decoration === "academic") && <MiniCornerOrnaments color={config.accent} softColor={config.soft} />}
        {config.decoration === "wave" && <MiniWave primary={config.accent} secondary={config.secondary} />}
        {config.decoration === "floral" && <MiniFloral />}
        {config.decoration === "playful" && <MiniPlayful />}

        <div
          className="relative z-10 m-[4%] flex h-[92%] flex-col justify-between border p-[5%] text-center"
          style={{ background: config.panelBg, borderColor: config.borderColor }}
        >
          <div className="flex items-center gap-2">
            <div className="h-px flex-1" style={{ background: config.lineColor }} />
            <p className={`text-[9px] font-black uppercase tracking-[0.22em] ${dark ? "text-amber-100" : "text-slate-600"}`}>Certificate</p>
            <div className="h-px flex-1" style={{ background: config.lineColor }} />
          </div>

          <div>
            <p className={`text-base font-black uppercase leading-tight ${config.headingFont} ${dark ? "text-white" : "text-slate-950"}`}>Certificate</p>
            <div className="mx-auto mt-2 h-1 w-20 rounded-full" style={{ background: config.lineColor }} />
            <p className="mt-2 truncate text-xl font-black" style={{ color: config.nameColor }}>Recipient Name</p>
          </div>

          <div className="grid grid-cols-3 items-end gap-2">
            <div className="space-y-1">
              <div className="mx-auto h-px w-16" style={{ background: config.lineColor }} />
              <div className={`mx-auto h-1.5 w-12 rounded-full ${dark ? "bg-white/25" : "bg-slate-200"}`} />
            </div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 text-[7px] font-black uppercase" style={{ borderColor: config.sealColor, color: config.sealColor }}>
              Seal
            </div>
            <div className="space-y-1">
              <div className="ml-auto h-1.5 w-16 rounded-full" style={{ background: dark ? "rgba(255,255,255,0.24)" : "#e2e8f0" }} />
              <div className="ml-auto h-1.5 w-12 rounded-full" style={{ background: dark ? "rgba(255,255,255,0.18)" : "#e2e8f0" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateMiniPreview({ template }) {
  if (template.designKey) {
    return <PremiumCertificateMiniPreview template={template} />;
  }

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
    alert("Poster generation is planned for a future release.");
  };

  const itemLabel = activeTab === "certificate" ? "certificate templates" : "poster designs";

  return (
    <section className="page-transition space-y-7">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Templates</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Template Gallery</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">Choose from certificate templates and event poster designs.</p>
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

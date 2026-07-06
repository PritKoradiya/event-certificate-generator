const templates = [
  {
    name: "Classic Certificate",
    description: "A clean formal layout for participation and completion certificates.",
    category: "General"
  },
  {
    name: "Modern Blue Certificate",
    description: "A fresh blue design suitable for student activities and technical events.",
    category: "Workshop"
  },
  {
    name: "Gold Achievement Certificate",
    description: "A premium style for winners, toppers, and achievement recognition.",
    category: "Achievement"
  },
  {
    name: "Seminar Certificate",
    description: "A simple professional format for seminar attendance certificates.",
    category: "Seminar"
  },
  {
    name: "Conference Certificate",
    description: "A polished design for conference participation and paper presentations.",
    category: "Conference"
  },
  {
    name: "FDP Certificate",
    description: "A formal faculty development program certificate layout.",
    category: "FDP"
  }
];

function Templates() {
  const handleUseTemplate = () => {
    alert("Template selection will be connected in next step.");
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Templates</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Certificate designs</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <div key={template.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-primary-200 bg-primary-50 text-center text-sm font-bold text-primary-700">
              Design Preview
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
              onClick={handleUseTemplate}
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

const categories = [
  {
    name: "Seminar",
    explanation: "For academic sessions, guest lectures, and knowledge sharing programs.",
    example: "Cyber Security Awareness Seminar",
    templates: "2 templates"
  },
  {
    name: "Conference",
    explanation: "For multi-session events, paper presentations, and professional meets.",
    example: "International Research Conference",
    templates: "2 templates"
  },
  {
    name: "FDP",
    explanation: "For faculty development programs and professional training sessions.",
    example: "AI Tools for Teaching FDP",
    templates: "1 template"
  },
  {
    name: "Expert Talk",
    explanation: "For invited expert sessions conducted by industry or academic speakers.",
    example: "Cloud Computing Expert Talk",
    templates: "1 template"
  },
  {
    name: "Workshop",
    explanation: "For hands-on learning sessions, labs, and practical skill events.",
    example: "React Basics Workshop",
    templates: "2 templates"
  },
  {
    name: "Webinar",
    explanation: "For online events, virtual talks, and remote learning sessions.",
    example: "Career Guidance Webinar",
    templates: "1 template"
  }
];

function Categories() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Categories</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Event certificate categories</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-4 h-2 w-16 rounded-full bg-primary-500" />
            <h3 className="text-lg font-bold text-slate-950">{category.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{category.explanation}</p>
            <div className="mt-4 space-y-2 rounded-md bg-slate-50 p-4 text-sm">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-800">Example:</span> {category.example}
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-800">Total templates:</span> {category.templates}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;

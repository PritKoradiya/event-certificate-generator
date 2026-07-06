import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Seminar",
    badge: "S",
    explanation: "Academic sessions, guest lectures, and knowledge sharing programs.",
    example: "Cyber Security Awareness Seminar",
    templates: "1+ templates"
  },
  {
    name: "Conference",
    badge: "C",
    explanation: "Multi-session events, paper presentations, and professional meets.",
    example: "International Research Conference",
    templates: "1+ templates"
  },
  {
    name: "FDP",
    badge: "F",
    explanation: "Faculty development programs and professional training sessions.",
    example: "AI Tools for Teaching FDP",
    templates: "1+ templates"
  },
  {
    name: "Expert Talk",
    badge: "E",
    explanation: "Invited expert sessions by industry or academic speakers.",
    example: "Cloud Computing Expert Talk",
    templates: "1+ templates"
  },
  {
    name: "Workshop",
    badge: "W",
    explanation: "Hands-on learning sessions, labs, and practical skill events.",
    example: "React Basics Workshop",
    templates: "1+ templates"
  },
  {
    name: "Webinar",
    badge: "O",
    explanation: "Online events, virtual talks, and remote learning sessions.",
    example: "Career Guidance Webinar",
    templates: "1+ templates"
  },
  {
    name: "Hackathon",
    badge: "H",
    explanation: "Coding sprints, innovation challenges, and prototype building.",
    example: "Smart City Hackathon",
    templates: "1+ templates"
  },
  {
    name: "Training",
    badge: "T",
    explanation: "Internship, training, and course completion certificates.",
    example: "Full Stack Development Training",
    templates: "3+ templates"
  },
  {
    name: "Competition",
    badge: "K",
    explanation: "Coding contests, project challenges, and competitive events.",
    example: "Intercollege Coding Competition",
    templates: "3+ templates"
  },
  {
    name: "Appreciation",
    badge: "A",
    explanation: "Recognition for contribution, support, and volunteer service.",
    example: "Volunteer Appreciation Drive",
    templates: "2+ templates"
  },
  {
    name: "Academic",
    badge: "D",
    explanation: "Achievement, excellence, and academic recognition certificates.",
    example: "Academic Excellence Award",
    templates: "4+ templates"
  },
  {
    name: "Cultural",
    badge: "U",
    explanation: "Cultural programs, performances, and creative events.",
    example: "Annual Cultural Fest",
    templates: "1+ templates"
  },
  {
    name: "Sports",
    badge: "P",
    explanation: "Sports days, tournaments, and athletic achievements.",
    example: "Interdepartment Cricket Tournament",
    templates: "1+ templates"
  },
  {
    name: "Technical",
    badge: "X",
    explanation: "Technical festivals, demos, exhibitions, and club events.",
    example: "Project Exhibition Day",
    templates: "3+ templates"
  }
];

const stats = ["14+ Categories", "24+ Certificate Templates", "12+ Poster Designs", "PDF Export Ready"];

function Categories() {
  const navigate = useNavigate();

  const handleExploreTemplates = (categoryName) => {
    localStorage.setItem("selectedTemplateCategory", categoryName);
    navigate("/templates");
  };

  return (
    <section className="page-transition space-y-6">
      <div className="overflow-hidden rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Categories</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">Event Certificate Categories</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Select categories for seminars, conferences, FDPs, workshops, competitions, and more.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat} className="scale-in rounded-md border border-blue-100 bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
              {stat}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="card-hover rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-black text-primary-700">
                {category.badge}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-950">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{category.explanation}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 rounded-md bg-slate-50 p-4 text-sm">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-800">Example use case:</span> {category.example}
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-800">Related templates:</span> {category.templates}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleExploreTemplates(category.name)}
              className="soft-hover mt-4 w-full rounded-md border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-bold text-primary-700 transition hover:bg-primary-100"
            >
              Explore Templates
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;

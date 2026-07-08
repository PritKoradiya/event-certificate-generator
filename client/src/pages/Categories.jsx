import { useNavigate } from "react-router-dom";
import posterData from "../data/posterData.js";
import templateData from "../data/templateData.js";

const categories = [
  { name: "Seminar", badge: "S", explanation: "Academic sessions, guest lectures, and knowledge sharing programs.", example: "Cyber Security Awareness Seminar" },
  { name: "Conference", badge: "C", explanation: "Multi-session events, paper presentations, and professional meets.", example: "International Research Conference" },
  { name: "FDP", badge: "F", explanation: "Faculty development programs and professional training sessions.", example: "AI Tools for Teaching FDP" },
  { name: "Expert Talk", badge: "E", explanation: "Invited expert sessions by industry or academic speakers.", example: "Cloud Computing Expert Talk" },
  { name: "Workshop", badge: "W", explanation: "Hands-on learning sessions, labs, and practical skill events.", example: "React Basics Workshop" },
  { name: "Webinar", badge: "O", explanation: "Online events, virtual talks, and remote learning sessions.", example: "Career Guidance Webinar" },
  { name: "Hackathon", badge: "H", explanation: "Coding sprints, innovation challenges, and prototype building.", example: "Smart City Hackathon" },
  { name: "Training", badge: "T", explanation: "Internship, training, and course completion certificates.", example: "Full Stack Development Training" },
  { name: "Competition", badge: "K", explanation: "Coding contests, project challenges, and competitive events.", example: "Intercollege Coding Competition" },
  { name: "Appreciation", badge: "A", explanation: "Recognition for contribution, support, and volunteer service.", example: "Volunteer Appreciation Drive" },
  { name: "Academic", badge: "D", explanation: "Achievement, excellence, and academic recognition certificates.", example: "Academic Excellence Award" },
  { name: "Cultural", badge: "U", explanation: "Cultural programs, performances, and creative events.", example: "Annual Cultural Fest" },
  { name: "Sports", badge: "P", explanation: "Sports days, tournaments, and athletic achievements.", example: "Interdepartment Cricket Tournament" },
  { name: "Technical", badge: "X", explanation: "Technical festivals, demos, exhibitions, and club events.", example: "Project Exhibition Day" }
];

function Categories() {
  const navigate = useNavigate();
  const stats = [`${categories.length} Categories`, `${templateData.length} Certificate Templates`, `${posterData.length} Poster Designs`, "PDF Export Ready"];

  const countTemplatesByCategory = (categoryName) => {
    return templateData.filter((template) => template.category === categoryName).length;
  };

  const countPostersByCategory = (categoryName) => {
    return posterData.filter((poster) => poster.category === categoryName).length;
  };

  const handleExploreTemplates = (categoryName) => {
    localStorage.setItem("selectedTemplateCategory", categoryName);
    navigate("/templates");
  };

  return (
    <section className="page-transition space-y-7">
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-soft lg:p-10">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Categories</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Event Categories</h2>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
          Organize certificates by event type such as seminars, conferences, workshops, FDPs, and hackathons.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat} className={`scale-in rounded-xl border border-blue-100 bg-white/85 px-5 py-4 text-base font-black text-slate-700 shadow-sm delay-${Math.min(index + 1, 4)}00`}>
              {stat}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const templateCount = countTemplatesByCategory(category.name);
          const posterCount = countPostersByCategory(category.name);

          return (
            <div key={category.name} className="card-hover group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-primary-700 transition group-hover:-translate-y-1 group-hover:rotate-3">
                  {category.badge}
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black text-slate-950">{category.name}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-500">{category.explanation}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-5 text-base">
                <p className="text-slate-600">
                  <span className="font-bold text-slate-800">Example:</span> {category.example}
                </p>
                <p className="text-slate-600">
                  <span className="font-bold text-slate-800">Certificate templates:</span> {templateCount}
                </p>
                <p className="text-slate-600">
                  <span className="font-bold text-slate-800">Poster designs:</span> {posterCount}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleExploreTemplates(category.name)}
                className="button-press soft-hover mt-5 w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-base font-black text-primary-700 transition hover:bg-primary-100"
              >
                Explore Templates
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;

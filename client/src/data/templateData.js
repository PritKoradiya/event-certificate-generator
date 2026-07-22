import backgroundTemplateData from "./backgroundTemplateData.js";

const baseTemplateData = [
  {
    id: "classic-appreciation",
    name: "Classic Appreciation Certificate",
    category: "Appreciation",
    description: "An elegant cream and warm brown appreciation certificate inspired by formal university layouts.",
    type: "certificate",
    designKey: "classic-appreciation",
    backgroundMode: "stretch",
    badgeClass: "bg-amber-100 text-amber-900",
    theme: {
      titleColor: "#4a3b32",
      nameColor: "#4a3b32",
      bodyColor: "#786354",
      mutedColor: "#786354",
      accentColor: "#b89759",
      borderColor: "rgba(184,151,89,0.4)",
      signatureColor: "#b89759",
      sealColor: "#b89759"
    }
  },
  {
    id: "classic-certificate",
    name: "Classic Certificate",
    category: "Academic",
    description: "A formal white certificate with a dark academic border.",
    type: "certificate",
    designKey: "academic-seal",
    backgroundMode: "stretch",
    badgeClass: "bg-slate-100 text-slate-800",
    theme: {
      titleColor: "#0f172a",
      nameColor: "#0f172a",
      bodyColor: "#334155",
      mutedColor: "#64748b",
      accentColor: "#1e3a8a",
      borderColor: "rgba(30,58,138,0.3)",
      signatureColor: "#1e3a8a",
      sealColor: "#d97706"
    }
  },
  {
    id: "modern-blue-certificate",
    name: "Modern Blue Certificate",
    category: "Technical",
    description: "A clean blue gradient certificate for modern technical events.",
    type: "certificate",
    designKey: "blue-corporate",
    backgroundMode: "stretch",
    badgeClass: "bg-blue-100 text-blue-800",
    theme: {
      titleColor: "#1e3a8a",
      nameColor: "#1e3a8a",
      bodyColor: "#334155",
      mutedColor: "#64748b",
      accentColor: "#2563eb",
      borderColor: "rgba(37,99,235,0.3)",
      signatureColor: "#2563eb",
      sealColor: "#2563eb"
    }
  },
  {
    id: "gold-achievement-certificate",
    name: "Gold Achievement Certificate",
    category: "Academic",
    description: "A premium light gold certificate for awards and achievements.",
    type: "certificate",
    designKey: "gold-corner",
    backgroundMode: "stretch",
    badgeClass: "bg-amber-100 text-amber-800",
    theme: {
      titleColor: "#78350f",
      nameColor: "#78350f",
      bodyColor: "#451a03",
      mutedColor: "#92400e",
      accentColor: "#d97706",
      borderColor: "rgba(217,119,6,0.4)",
      signatureColor: "#d97706",
      sealColor: "#d97706"
    }
  },
  {
    id: "seminar-certificate",
    name: "Seminar Certificate",
    category: "Seminar",
    description: "A neat academic certificate for seminars and guest sessions.",
    type: "certificate",
    designKey: "minimal-elegant",
    backgroundMode: "stretch",
    badgeClass: "bg-indigo-50 text-indigo-700",
    theme: {
      titleColor: "#312e81",
      nameColor: "#312e81",
      bodyColor: "#334155",
      mutedColor: "#4338ca",
      accentColor: "#4f46e5",
      borderColor: "rgba(79,70,229,0.3)",
      signatureColor: "#4f46e5",
      sealColor: "#4f46e5"
    }
  },
  {
    id: "conference-certificate",
    name: "Conference Certificate",
    category: "Conference",
    description: "A professional gray-blue layout for conferences.",
    type: "certificate",
    designKey: "modern-wave",
    backgroundMode: "stretch",
    badgeClass: "bg-sky-100 text-sky-800",
    theme: {
      titleColor: "#0f172a",
      nameColor: "#0f172a",
      bodyColor: "#334155",
      mutedColor: "#0284c7",
      accentColor: "#0284c7",
      borderColor: "rgba(2,132,199,0.3)",
      signatureColor: "#0284c7",
      sealColor: "#d97706"
    }
  },
  {
    id: "fdp-certificate",
    name: "FDP Certificate",
    category: "FDP",
    description: "A faculty development program certificate with green accents.",
    type: "certificate",
    designKey: "minimal-elegant",
    backgroundMode: "stretch",
    badgeClass: "bg-emerald-100 text-emerald-800",
    theme: {
      titleColor: "#064e3b",
      nameColor: "#064e3b",
      bodyColor: "#166534",
      mutedColor: "#047857",
      accentColor: "#059669",
      borderColor: "rgba(5,150,105,0.3)",
      signatureColor: "#059669",
      sealColor: "#059669"
    }
  },
  {
    id: "workshop-certificate",
    name: "Workshop Certificate",
    category: "Workshop",
    description: "A practical certificate design for hands-on learning events.",
    type: "certificate",
    designKey: "blue-corporate",
    backgroundMode: "stretch",
    badgeClass: "bg-cyan-100 text-cyan-800"
  },
  {
    id: "webinar-certificate",
    name: "Webinar Certificate",
    category: "Webinar",
    description: "A clean certificate for virtual talks and online sessions.",
    type: "certificate",
    designKey: "minimal-elegant",
    backgroundMode: "stretch",
    badgeClass: "bg-violet-100 text-violet-800"
  },
  {
    id: "expert-talk-certificate",
    name: "Expert Talk Certificate",
    category: "Expert Talk",
    description: "A polished design for invited expert talks and lectures.",
    type: "certificate",
    designKey: "classic-ornate",
    backgroundMode: "stretch",
    badgeClass: "bg-purple-100 text-purple-800"
  },
  {
    id: "hackathon-certificate",
    name: "Hackathon Certificate",
    category: "Hackathon",
    description: "A sharp energetic layout for coding sprints and hackathons.",
    type: "certificate",
    designKey: "modern-wave",
    backgroundMode: "stretch",
    badgeClass: "bg-fuchsia-100 text-fuchsia-800"
  },
  {
    id: "internship-certificate",
    name: "Internship Certificate",
    category: "Training",
    description: "A formal training certificate for internship completion.",
    type: "certificate",
    designKey: "academic-seal",
    backgroundMode: "stretch",
    badgeClass: "bg-teal-100 text-teal-800"
  },
  {
    id: "training-completion-certificate",
    name: "Training Completion Certificate",
    category: "Training",
    description: "A calm professional certificate for training programs.",
    type: "certificate",
    designKey: "blue-corporate",
    backgroundMode: "stretch",
    badgeClass: "bg-lime-100 text-lime-800"
  },
  {
    id: "participation-certificate",
    name: "Participation Certificate",
    category: "Competition",
    description: "A versatile design for participation in events and contests.",
    type: "certificate",
    designKey: "minimal-elegant",
    backgroundMode: "stretch",
    badgeClass: "bg-blue-100 text-blue-800"
  },
  {
    id: "appreciation-certificate",
    name: "Appreciation Certificate",
    category: "Appreciation",
    description: "A warm certificate for appreciation and recognition.",
    type: "certificate",
    designKey: "classic-appreciation",
    backgroundMode: "stretch",
    badgeClass: "bg-rose-100 text-rose-800"
  },
  {
    id: "excellence-certificate",
    name: "Excellence Certificate",
    category: "Academic",
    description: "A refined certificate for excellence and top performance.",
    type: "certificate",
    designKey: "gold-corner",
    backgroundMode: "stretch",
    badgeClass: "bg-yellow-100 text-yellow-800"
  },
  {
    id: "academic-achievement-certificate",
    name: "Academic Achievement Certificate",
    category: "Academic",
    description: "A college-style certificate for academic achievement.",
    type: "certificate",
    designKey: "academic-seal",
    backgroundMode: "stretch",
    badgeClass: "bg-stone-100 text-stone-800"
  },
  {
    id: "sports-event-certificate",
    name: "Sports Event Certificate",
    category: "Sports",
    description: "A bright certificate for sports events and tournaments.",
    type: "certificate",
    designKey: "playful-award",
    backgroundMode: "stretch",
    badgeClass: "bg-orange-100 text-orange-800"
  },
  {
    id: "cultural-event-certificate",
    name: "Cultural Event Certificate",
    category: "Cultural",
    description: "A vibrant design for cultural programs and performances.",
    type: "certificate",
    designKey: "floral-creative",
    backgroundMode: "stretch",
    badgeClass: "bg-pink-100 text-pink-800"
  },
  {
    id: "technical-event-certificate",
    name: "Technical Event Certificate",
    category: "Technical",
    description: "A crisp certificate for tech fests and technical sessions.",
    type: "certificate",
    designKey: "modern-wave",
    backgroundMode: "stretch",
    badgeClass: "bg-slate-100 text-slate-800"
  },
  {
    id: "coding-competition-certificate",
    name: "Coding Competition Certificate",
    category: "Competition",
    description: "A clean coding contest certificate with a strong blue accent.",
    type: "certificate",
    designKey: "modern-wave",
    backgroundMode: "stretch",
    badgeClass: "bg-cyan-100 text-cyan-800"
  },
  {
    id: "project-exhibition-certificate",
    name: "Project Exhibition Certificate",
    category: "Technical",
    description: "A professional design for project exhibitions and showcases.",
    type: "certificate",
    designKey: "blue-corporate",
    backgroundMode: "stretch",
    badgeClass: "bg-green-100 text-green-800"
  },
  {
    id: "innovation-award-certificate",
    name: "Innovation Award Certificate",
    category: "Competition",
    description: "A premium award certificate for innovation challenges.",
    type: "certificate",
    designKey: "gold-corner",
    backgroundMode: "stretch",
    badgeClass: "bg-amber-100 text-amber-800"
  },
  {
    id: "volunteer-certificate",
    name: "Volunteer Certificate",
    category: "Appreciation",
    description: "A friendly certificate for volunteer service and contribution.",
    type: "certificate",
    designKey: "classic-appreciation",
    backgroundMode: "stretch",
    badgeClass: "bg-emerald-100 text-emerald-800"
  },
  {
    id: "completion-certificate",
    name: "Completion Certificate",
    category: "Training",
    description: "A simple professional certificate for course completion.",
    type: "certificate",
    designKey: "academic-seal",
    backgroundMode: "stretch",
    badgeClass: "bg-indigo-100 text-indigo-800"
  },
  {
    id: "classic-ornate-certificate",
    name: "Classic Ornate Certificate",
    category: "Academic",
    description: "An original cream and navy ornate certificate with formal serif styling.",
    type: "certificate",
    designKey: "classic-ornate",
    backgroundMode: "stretch",
    badgeClass: "bg-indigo-100 text-indigo-900"
  },
  {
    id: "modern-wave-certificate",
    name: "Modern Wave Certificate",
    category: "Conference",
    description: "A clean corporate certificate with teal and gold CSS wave accents.",
    type: "certificate",
    designKey: "modern-wave",
    backgroundMode: "stretch",
    badgeClass: "bg-teal-100 text-teal-800"
  },
  {
    id: "vintage-border-certificate",
    name: "Vintage Border Certificate",
    category: "Academic",
    description: "A parchment-inspired premium certificate with subtle CSS texture.",
    type: "certificate",
    designKey: "vintage-border",
    backgroundMode: "stretch",
    badgeClass: "bg-stone-100 text-stone-800"
  },
  {
    id: "gold-corner-certificate",
    name: "Gold Corner Certificate",
    category: "Appreciation",
    description: "A white award certificate with gold corner ornaments and a medal seal.",
    type: "certificate",
    designKey: "gold-corner",
    backgroundMode: "stretch",
    badgeClass: "bg-amber-100 text-amber-800"
  },
  {
    id: "dark-luxury-certificate",
    name: "Dark Luxury Certificate",
    category: "Competition",
    description: "A dark charcoal achievement certificate with readable gold accents.",
    type: "certificate",
    designKey: "dark-luxury",
    backgroundMode: "stretch",
    badgeClass: "bg-slate-900 text-amber-200",
    theme: {
      titleColor: "#f8fafc",
      nameColor: "#fbbf24",
      bodyColor: "#e2e8f0",
      mutedColor: "#94a3b8",
      accentColor: "#fbbf24",
      borderColor: "rgba(251,191,36,0.4)",
      signatureColor: "#fbbf24",
      sealColor: "#fbbf24"
    }
  },
  {
    id: "floral-creative-certificate",
    name: "Floral Creative Certificate",
    category: "Cultural",
    description: "A fresh event certificate with original SVG floral corner decorations.",
    type: "certificate",
    designKey: "floral-creative",
    backgroundMode: "stretch",
    badgeClass: "bg-orange-100 text-orange-800"
  },
  {
    id: "playful-award-certificate",
    name: "Playful Award Certificate",
    category: "Competition",
    description: "A bright student-friendly award design with geometric CSS shapes.",
    type: "certificate",
    designKey: "playful-award",
    backgroundMode: "stretch",
    badgeClass: "bg-orange-100 text-orange-800"
  },
  {
    id: "blue-corporate-certificate",
    name: "Blue Corporate Certificate",
    category: "Training",
    description: "A polished blue and white certificate for training and professional events.",
    type: "certificate",
    designKey: "blue-corporate",
    backgroundMode: "stretch",
    badgeClass: "bg-blue-100 text-blue-800"
  },
  {
    id: "minimal-elegant-certificate",
    name: "Minimal Elegant Certificate",
    category: "Seminar",
    description: "A pure white minimalist certificate with restrained gray line work.",
    type: "certificate",
    designKey: "minimal-elegant",
    backgroundMode: "stretch",
    badgeClass: "bg-slate-100 text-slate-700"
  },
  {
    id: "academic-seal-certificate",
    name: "Academic Seal Certificate",
    category: "Academic",
    description: "A formal university-style certificate with deep blue border and seal.",
    type: "certificate",
    designKey: "academic-seal",
    backgroundMode: "stretch",
    badgeClass: "bg-blue-100 text-blue-900"
  }
].map((item) => ({
  backgroundMode: "stretch",
  theme: {
    titleColor: "#0f172a",
    nameColor: "#0f172a",
    bodyColor: "#334155",
    mutedColor: "#64748b",
    accentColor: "#1e3a8a",
    borderColor: "rgba(30,58,138,0.3)",
    signatureColor: "#1e3a8a",
    sealColor: "#d97706",
    ...item.theme
  },
  ...item
}));

const normalizedBackgroundTemplates = backgroundTemplateData.map((item) => ({
  ...item,
  backgroundMode: item.backgroundMode || "stretch",
  theme: {
    titleColor: item.textTheme === "light" ? "#ffffff" : "#0f172a",
    nameColor: item.textTheme === "light" ? "#fef08a" : "#0f172a",
    bodyColor: item.textTheme === "light" ? "#e2e8f0" : "#334155",
    mutedColor: item.textTheme === "light" ? "#cbd5e1" : "#64748b",
    accentColor: item.textTheme === "light" ? "#fbbf24" : "#1e3a8a",
    borderColor: item.textTheme === "light" ? "rgba(251,191,36,0.5)" : "rgba(30,58,138,0.3)",
    signatureColor: item.textTheme === "light" ? "#fbbf24" : "#1e3a8a",
    sealColor: item.textTheme === "light" ? "#fbbf24" : "#d97706",
    ...item.theme
  }
}));

const templateData = [...baseTemplateData, ...normalizedBackgroundTemplates];

export default templateData;

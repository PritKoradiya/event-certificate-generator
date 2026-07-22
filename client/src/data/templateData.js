import backgroundTemplateData from "./backgroundTemplateData.js";

const baseTemplateData = [
  {
    id: "classic-appreciation",
    name: "Classic Appreciation Certificate",
    category: "Appreciation",
    description: "An elegant cream and warm brown appreciation certificate inspired by formal university layouts.",
    type: "certificate",
    designKey: "classic-appreciation",
    badgeClass: "bg-amber-100 text-amber-900",
    theme: {
      primaryText: "#4a3b32",
      secondaryText: "#786354",
      accent: "#b89759",
      line: "rgba(184,151,89,0.4)",
      seal: "#b89759"
    }
  },
  {
    id: "classic-certificate",
    name: "Classic Certificate",
    category: "Academic",
    description: "A formal white certificate with a dark academic border.",
    type: "certificate",
    accentClass: "bg-slate-800",
    previewClass: "border-slate-800 bg-white",
    borderClass: "border-slate-800",
    badgeClass: "bg-slate-100 text-slate-800",
    headingClass: "font-serif text-slate-950"
  },
  {
    id: "modern-blue-certificate",
    name: "Modern Blue Certificate",
    category: "Technical",
    description: "A clean blue gradient certificate for modern technical events.",
    type: "certificate",
    accentClass: "bg-blue-600",
    previewClass: "border-blue-300 bg-gradient-to-br from-blue-50 to-white",
    borderClass: "border-blue-300",
    badgeClass: "bg-blue-100 text-blue-800",
    headingClass: "text-blue-950"
  },
  {
    id: "gold-achievement-certificate",
    name: "Gold Achievement Certificate",
    category: "Academic",
    description: "A premium light gold certificate for awards and achievements.",
    type: "certificate",
    accentClass: "bg-amber-500",
    previewClass: "border-amber-400 bg-amber-50",
    borderClass: "border-amber-400",
    badgeClass: "bg-amber-100 text-amber-800",
    headingClass: "font-serif text-amber-950"
  },
  {
    id: "seminar-certificate",
    name: "Seminar Certificate",
    category: "Seminar",
    description: "A neat academic certificate for seminars and guest sessions.",
    type: "certificate",
    accentClass: "bg-indigo-500",
    previewClass: "border-indigo-200 bg-white",
    borderClass: "border-indigo-200",
    badgeClass: "bg-indigo-50 text-indigo-700",
    headingClass: "text-indigo-950"
  },
  {
    id: "conference-certificate",
    name: "Conference Certificate",
    category: "Conference",
    description: "A professional gray-blue layout for conferences.",
    type: "certificate",
    accentClass: "bg-sky-700",
    previewClass: "border-sky-300 bg-slate-50",
    borderClass: "border-sky-300",
    badgeClass: "bg-sky-100 text-sky-800",
    headingClass: "text-slate-950"
  },
  {
    id: "fdp-certificate",
    name: "FDP Certificate",
    category: "FDP",
    description: "A faculty development program certificate with green accents.",
    type: "certificate",
    accentClass: "bg-emerald-600",
    previewClass: "border-emerald-300 bg-emerald-50",
    borderClass: "border-emerald-300",
    badgeClass: "bg-emerald-100 text-emerald-800",
    headingClass: "text-emerald-950"
  },
  {
    id: "workshop-certificate",
    name: "Workshop Certificate",
    category: "Workshop",
    description: "A practical certificate design for hands-on learning events.",
    type: "certificate",
    accentClass: "bg-cyan-600",
    previewClass: "border-cyan-300 bg-cyan-50",
    borderClass: "border-cyan-300",
    badgeClass: "bg-cyan-100 text-cyan-800",
    headingClass: "text-cyan-950"
  },
  {
    id: "webinar-certificate",
    name: "Webinar Certificate",
    category: "Webinar",
    description: "A clean certificate for virtual talks and online sessions.",
    type: "certificate",
    accentClass: "bg-violet-600",
    previewClass: "border-violet-300 bg-violet-50",
    borderClass: "border-violet-300",
    badgeClass: "bg-violet-100 text-violet-800",
    headingClass: "text-violet-950"
  },
  {
    id: "expert-talk-certificate",
    name: "Expert Talk Certificate",
    category: "Expert Talk",
    description: "A polished design for invited expert talks and lectures.",
    type: "certificate",
    accentClass: "bg-purple-600",
    previewClass: "border-purple-300 bg-purple-50",
    borderClass: "border-purple-300",
    badgeClass: "bg-purple-100 text-purple-800",
    headingClass: "text-purple-950"
  },
  {
    id: "hackathon-certificate",
    name: "Hackathon Certificate",
    category: "Hackathon",
    description: "A sharp energetic layout for coding sprints and hackathons.",
    type: "certificate",
    accentClass: "bg-fuchsia-600",
    previewClass: "border-fuchsia-300 bg-fuchsia-50",
    borderClass: "border-fuchsia-300",
    badgeClass: "bg-fuchsia-100 text-fuchsia-800",
    headingClass: "text-fuchsia-950"
  },
  {
    id: "internship-certificate",
    name: "Internship Certificate",
    category: "Training",
    description: "A formal training certificate for internship completion.",
    type: "certificate",
    accentClass: "bg-teal-600",
    previewClass: "border-teal-300 bg-teal-50",
    borderClass: "border-teal-300",
    badgeClass: "bg-teal-100 text-teal-800",
    headingClass: "text-teal-950"
  },
  {
    id: "training-completion-certificate",
    name: "Training Completion Certificate",
    category: "Training",
    description: "A calm professional certificate for training programs.",
    type: "certificate",
    accentClass: "bg-lime-600",
    previewClass: "border-lime-300 bg-lime-50",
    borderClass: "border-lime-300",
    badgeClass: "bg-lime-100 text-lime-800",
    headingClass: "text-lime-950"
  },
  {
    id: "participation-certificate",
    name: "Participation Certificate",
    category: "Competition",
    description: "A versatile design for participation in events and contests.",
    type: "certificate",
    accentClass: "bg-blue-500",
    previewClass: "border-blue-200 bg-blue-50",
    borderClass: "border-blue-200",
    badgeClass: "bg-blue-100 text-blue-800",
    headingClass: "text-blue-950"
  },
  {
    id: "appreciation-certificate",
    name: "Appreciation Certificate",
    category: "Appreciation",
    description: "A warm certificate for appreciation and recognition.",
    type: "certificate",
    accentClass: "bg-rose-500",
    previewClass: "border-rose-300 bg-rose-50",
    borderClass: "border-rose-300",
    badgeClass: "bg-rose-100 text-rose-800",
    headingClass: "text-rose-950"
  },
  {
    id: "excellence-certificate",
    name: "Excellence Certificate",
    category: "Academic",
    description: "A refined certificate for excellence and top performance.",
    type: "certificate",
    accentClass: "bg-yellow-500",
    previewClass: "border-yellow-300 bg-yellow-50",
    borderClass: "border-yellow-300",
    badgeClass: "bg-yellow-100 text-yellow-800",
    headingClass: "font-serif text-yellow-950"
  },
  {
    id: "academic-achievement-certificate",
    name: "Academic Achievement Certificate",
    category: "Academic",
    description: "A college-style certificate for academic achievement.",
    type: "certificate",
    accentClass: "bg-stone-700",
    previewClass: "border-stone-300 bg-stone-50",
    borderClass: "border-stone-300",
    badgeClass: "bg-stone-100 text-stone-800",
    headingClass: "font-serif text-stone-950"
  },
  {
    id: "sports-event-certificate",
    name: "Sports Event Certificate",
    category: "Sports",
    description: "A bright certificate for sports events and tournaments.",
    type: "certificate",
    accentClass: "bg-orange-500",
    previewClass: "border-orange-300 bg-orange-50",
    borderClass: "border-orange-300",
    badgeClass: "bg-orange-100 text-orange-800",
    headingClass: "text-orange-950"
  },
  {
    id: "cultural-event-certificate",
    name: "Cultural Event Certificate",
    category: "Cultural",
    description: "A vibrant design for cultural programs and performances.",
    type: "certificate",
    accentClass: "bg-pink-500",
    previewClass: "border-pink-300 bg-pink-50",
    borderClass: "border-pink-300",
    badgeClass: "bg-pink-100 text-pink-800",
    headingClass: "text-pink-950"
  },
  {
    id: "technical-event-certificate",
    name: "Technical Event Certificate",
    category: "Technical",
    description: "A crisp certificate for tech fests and technical sessions.",
    type: "certificate",
    accentClass: "bg-slate-600",
    previewClass: "border-slate-300 bg-slate-50",
    borderClass: "border-slate-300",
    badgeClass: "bg-slate-100 text-slate-800",
    headingClass: "text-slate-950"
  },
  {
    id: "coding-competition-certificate",
    name: "Coding Competition Certificate",
    category: "Competition",
    description: "A clean coding contest certificate with a strong blue accent.",
    type: "certificate",
    accentClass: "bg-cyan-700",
    previewClass: "border-cyan-400 bg-cyan-50",
    borderClass: "border-cyan-400",
    badgeClass: "bg-cyan-100 text-cyan-800",
    headingClass: "text-cyan-950"
  },
  {
    id: "project-exhibition-certificate",
    name: "Project Exhibition Certificate",
    category: "Technical",
    description: "A professional design for project exhibitions and showcases.",
    type: "certificate",
    accentClass: "bg-green-600",
    previewClass: "border-green-300 bg-green-50",
    borderClass: "border-green-300",
    badgeClass: "bg-green-100 text-green-800",
    headingClass: "text-green-950"
  },
  {
    id: "innovation-award-certificate",
    name: "Innovation Award Certificate",
    category: "Competition",
    description: "A premium award certificate for innovation challenges.",
    type: "certificate",
    accentClass: "bg-amber-600",
    previewClass: "border-amber-500 bg-gradient-to-br from-amber-50 to-white",
    borderClass: "border-amber-500",
    badgeClass: "bg-amber-100 text-amber-800",
    headingClass: "font-serif text-amber-950"
  },
  {
    id: "volunteer-certificate",
    name: "Volunteer Certificate",
    category: "Appreciation",
    description: "A friendly certificate for volunteer service and contribution.",
    type: "certificate",
    accentClass: "bg-emerald-500",
    previewClass: "border-emerald-200 bg-white",
    borderClass: "border-emerald-200",
    badgeClass: "bg-emerald-100 text-emerald-800",
    headingClass: "text-emerald-950"
  },
  {
    id: "completion-certificate",
    name: "Completion Certificate",
    category: "Training",
    description: "A simple professional certificate for course completion.",
    type: "certificate",
    accentClass: "bg-indigo-600",
    previewClass: "border-indigo-300 bg-indigo-50",
    borderClass: "border-indigo-300",
    badgeClass: "bg-indigo-100 text-indigo-800",
    headingClass: "text-indigo-950"
  },
  {
    id: "classic-ornate-certificate",
    name: "Classic Ornate Certificate",
    category: "Academic",
    description: "An original cream and navy ornate certificate with formal serif styling.",
    type: "certificate",
    designKey: "classic-ornate",
    badgeClass: "bg-indigo-100 text-indigo-900"
  },
  {
    id: "modern-wave-certificate",
    name: "Modern Wave Certificate",
    category: "Conference",
    description: "A clean corporate certificate with teal and gold CSS wave accents.",
    type: "certificate",
    designKey: "modern-wave",
    badgeClass: "bg-teal-100 text-teal-800"
  },
  {
    id: "vintage-border-certificate",
    name: "Vintage Border Certificate",
    category: "Academic",
    description: "A parchment-inspired premium certificate with subtle CSS texture.",
    type: "certificate",
    designKey: "vintage-border",
    badgeClass: "bg-stone-100 text-stone-800"
  },
  {
    id: "gold-corner-certificate",
    name: "Gold Corner Certificate",
    category: "Appreciation",
    description: "A white award certificate with gold corner ornaments and a medal seal.",
    type: "certificate",
    designKey: "gold-corner",
    badgeClass: "bg-amber-100 text-amber-800"
  },
  {
    id: "dark-luxury-certificate",
    name: "Dark Luxury Certificate",
    category: "Competition",
    description: "A dark charcoal achievement certificate with readable gold accents.",
    type: "certificate",
    designKey: "dark-luxury",
    badgeClass: "bg-slate-900 text-amber-200"
  },
  {
    id: "floral-creative-certificate",
    name: "Floral Creative Certificate",
    category: "Cultural",
    description: "A fresh event certificate with original SVG floral corner decorations.",
    type: "certificate",
    designKey: "floral-creative",
    badgeClass: "bg-orange-100 text-orange-800"
  },
  {
    id: "playful-award-certificate",
    name: "Playful Award Certificate",
    category: "Competition",
    description: "A bright student-friendly award design with geometric CSS shapes.",
    type: "certificate",
    designKey: "playful-award",
    badgeClass: "bg-orange-100 text-orange-800"
  },
  {
    id: "blue-corporate-certificate",
    name: "Blue Corporate Certificate",
    category: "Training",
    description: "A polished blue and white certificate for training and professional events.",
    type: "certificate",
    designKey: "blue-corporate",
    badgeClass: "bg-blue-100 text-blue-800"
  },
  {
    id: "minimal-elegant-certificate",
    name: "Minimal Elegant Certificate",
    category: "Seminar",
    description: "A pure white minimalist certificate with restrained gray line work.",
    type: "certificate",
    designKey: "minimal-elegant",
    badgeClass: "bg-slate-100 text-slate-700"
  },
  {
    id: "academic-seal-certificate",
    name: "Academic Seal Certificate",
    category: "Academic",
    description: "A formal university-style certificate with deep blue border and seal.",
    type: "certificate",
    designKey: "academic-seal",
    badgeClass: "bg-blue-100 text-blue-900"
  }
].map((item) => ({
  backgroundFit: "stretch",
  ...item
}));

const templateData = [...baseTemplateData, ...backgroundTemplateData];

export default templateData;

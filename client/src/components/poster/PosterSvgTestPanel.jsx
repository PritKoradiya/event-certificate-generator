import React, { useState, useRef } from "react";
import PosterSvg from "./PosterSvg.jsx";
import posterData from "../../data/posterData.js";
import { downloadPosterPng, downloadPosterPdf } from "../../utils/downloadPoster.js";

const testCases = [
  {
    name: "1. Normal Poster",
    data: {
      posterTitle: "ANNUAL INNOVATION & TECH SUMMIT 2026",
      tagline: "Empowering Next-Gen Innovators & Leaders",
      category: "Seminar",
      templateStyle: "Seminar Poster",
      designKey: "seminar-poster"
    }
  },
  {
    name: "2. Very Long Title",
    data: {
      posterTitle: "INTERNATIONAL MULTIDISCIPLINARY SYMPOSIUM ON ADVANCED ARTIFICIAL INTELLIGENCE AND CLOUD COMPUTING RESEARCH 2026",
      tagline: "Exploring Next Generation Frontier Tech",
      category: "Conference",
      templateStyle: "Conference Poster",
      designKey: "conference-poster"
    }
  },
  {
    name: "3. Three-Line Title",
    data: {
      posterTitle: "GLOBAL CYBERSECURITY & QUANTUM COMPUTING LEADERSHIP FORUM",
      tagline: "Securing the Digital Horizon Together",
      category: "Technical",
      templateStyle: "Technical Event Poster",
      designKey: "technical-event-poster"
    }
  },
  {
    name: "4. Long Organizer Name",
    data: {
      posterTitle: "FACULTY DEVELOPMENT PROGRAM 2026",
      organizerName: "Department of Computer Science and Information Technology in Association with IEEE Student Branch Chapter",
      category: "FDP",
      templateStyle: "FDP Poster",
      designKey: "fdp-poster"
    }
  },
  {
    name: "5. Long Speaker Name",
    data: {
      posterTitle: "EXPERT TALK ON DEEP LEARNING",
      speakerName: "Prof. Dr. Alexandra H. Dangerfield-Wellington, PhD (MIT)",
      speakerDesignation: "Chief Scientist & Distinguished University Professor of Cognitive Systems",
      category: "Expert Talk",
      templateStyle: "Expert Talk Poster",
      designKey: "expert-talk-poster"
    }
  },
  {
    name: "6. Long Venue",
    data: {
      posterTitle: "NATIONAL ROBOTICS HACKATHON",
      venue: "Grand International Convention & Research Center Auditorium, Block B, Floor 4, University Campus, South Campus Road, Tech City",
      category: "Hackathon",
      templateStyle: "Hackathon Poster",
      designKey: "hackathon-poster"
    }
  },
  {
    name: "7. Four-Line Description",
    data: {
      posterTitle: "HANDS-ON IOT & EMBEDDED SYSTEMS WORKSHOP",
      description: "Participate in an intensive hands-on lab workshop covering microcontrollers, sensor integration, cloud IoT telemetry, and real-time edge processing. Work directly with industry-grade hardware development boards alongside expert mentors.",
      category: "Workshop",
      templateStyle: "Workshop Poster",
      designKey: "workshop-poster"
    }
  },
  {
    name: "8. Poster with Event Image",
    data: {
      posterTitle: "VIBRANT CULTURAL NIGHT 2026",
      posterImage: "https://picsum.photos/800/500",
      category: "Cultural",
      templateStyle: "Cultural Event Poster",
      designKey: "cultural-event-poster"
    }
  },
  {
    name: "9. Poster with Logo",
    data: {
      posterTitle: "ANNUAL SPORTS CHAMPIONSHIP",
      organizationLogo: "https://picsum.photos/200/200",
      category: "Sports",
      templateStyle: "Sports Event Poster",
      designKey: "sports-event-poster"
    }
  },
  {
    name: "10. Dark Poster Template",
    data: {
      posterTitle: "ADVANCED DATA SCIENCE BOOTCAMP",
      category: "Training",
      templateStyle: "Training Program Poster",
      designKey: "training-program-poster"
    }
  },
  {
    name: "11. Light Accent Poster Template",
    data: {
      posterTitle: "GLOBAL WEBINAR ON SUSTAINABLE TECH",
      category: "Webinar",
      templateStyle: "Webinar Poster",
      designKey: "webinar-poster"
    }
  },
  {
    name: "12. All 12 Designs Test",
    data: {
      posterTitle: "PROJECT INNOVATION EXHIBITION 2026",
      category: "Technical",
      templateStyle: "Project Exhibition Poster",
      designKey: "project-exhibition-poster"
    }
  }
];

function PosterSvgTestPanel() {
  if (!import.meta.env.DEV) return null;

  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const svgRef = useRef(null);

  const activeCase = testCases[activeCaseIdx];
  const activeTemplate = posterData[activeTemplateIdx];

  const posterProps = {
    posterTitle: activeCase.data.posterTitle || "ANNUAL INNOVATION & TECH SUMMIT 2026",
    tagline: activeCase.data.tagline || "Empowering Next-Gen Innovators & Leaders",
    category: activeCase.data.category || activeTemplate.category,
    eventDate: "2026-08-15",
    eventTime: "10:00 AM - 04:00 PM",
    venue: activeCase.data.venue || "Main Auditorium, PP Savani University",
    speakerName: activeCase.data.speakerName || "Dr. Pritkumar Koradiya",
    speakerDesignation: activeCase.data.speakerDesignation || "AI & Cloud Architecture Specialist",
    organizerName: activeCase.data.organizerName || "School of Engineering & Tech Club",
    description: activeCase.data.description || "Join us for an immersive day of insightful technical talks, hands-on demonstrations, collaborative activities, and networking opportunities.",
    contactInformation: "+91 98765 43210 | info@ppsu.ac.in",
    registrationText: "Free Entry • Scan QR to Register Online",
    templateStyle: activeTemplate.name,
    designKey: activeTemplate.designKey,
    posterImage: activeCase.data.posterImage || "",
    organizationLogo: activeCase.data.organizationLogo || "",
    posterId: "TEST-DEV-2026"
  };

  return (
    <div className="my-8 rounded-3xl border-2 border-dashed border-purple-300 bg-purple-50/50 p-6 space-y-6 shadow-md">
      <div className="flex items-center justify-between border-b border-purple-200 pb-3">
        <div>
          <span className="rounded-full bg-purple-600 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
            DEV ONLY TEST SUITE
          </span>
          <h4 className="mt-1 text-xl font-black text-slate-900 font-sans">Poster SVG QA Test Panel</h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => downloadPosterPng(svgRef, `Test_${activeCase.name}.png`)}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 transition"
          >
            Download Test PNG
          </button>
          <button
            onClick={() => downloadPosterPdf(svgRef, `Test_${activeCase.name}.pdf`)}
            className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-black text-white hover:bg-purple-700 transition"
          >
            Download Test PDF
          </button>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            Edge Case Scenario ({testCases.length})
          </label>
          <select
            value={activeCaseIdx}
            onChange={(e) => setActiveCaseIdx(Number(e.target.value))}
            className="w-full rounded-xl border border-purple-200 bg-white p-2.5 text-xs font-bold text-slate-800"
          >
            {testCases.map((tc, idx) => (
              <option key={tc.name} value={idx}>
                {tc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            Template Theme (12/12)
          </label>
          <select
            value={activeTemplateIdx}
            onChange={(e) => setActiveTemplateIdx(Number(e.target.value))}
            className="w-full rounded-xl border border-purple-200 bg-white p-2.5 text-xs font-bold text-slate-800"
          >
            {posterData.map((t, idx) => (
              <option key={t.id} value={idx}>
                {t.name} ({t.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Test Canvas Preview */}
      <div className="w-full max-w-[600px] mx-auto bg-slate-900 rounded-3xl p-4 shadow-2xl">
        <PosterSvg ref={svgRef} id="poster-dev-test-svg" {...posterProps} />
      </div>
    </div>
  );
}

export default PosterSvgTestPanel;

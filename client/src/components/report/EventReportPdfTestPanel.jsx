import React, { useState } from "react";
import { downloadEventReportPdf } from "../../utils/downloadEventReportPdf.js";

const testCases = [
  {
    name: "1. Normal Report",
    data: {
      reportDate: "03/04/2026",
      eventDate: "02/04/2026",
      eventTime: "10.00 AM onwards",
      resourcePerson: "Dr. Chandresh Kumar Maurya, Associate Professor at IIT Indore",
      eventName: "Expert Talk on Prompt Engineering: Unlocking the Power of Generative AI",
      numberOfParticipants: "245",
      attendee: "4th and 8th Semester Students of School of Engineering",
      venue: "I-313",
      eventOutline: "An expert talk on 'Prompt Engineering: Unlocking the Power of Generative AI' was organized for students to provide insights into the latest advancements in generative AI and the significance of prompt engineering.",
      eventObjectives: [
        "To introduce students to the concept of prompt engineering and its importance in generative AI.",
        "To create awareness about the applications of generative AI in academics, research, and industry.",
        "To help students understand how to design effective prompts for obtaining better AI-generated outputs.",
        "To encourage students to explore AI tools for innovation, learning, and problem-solving.",
        "To discuss the ethical and responsible use of AI technologies."
      ],
      eventOutcomes: [
        "Students gained a clear understanding of prompt engineering and its practical applications.",
        "Participants learned techniques for creating structured and effective prompts.",
        "The session enhanced students' awareness of generative AI tools and their real-world usage.",
        "Students developed interest in exploring AI for academic and professional growth.",
        "The event inspired innovative thinking and responsible adoption of AI technologies."
      ],
      photoCaption: "Expert talk 'Prompt Engineering: Unlocking the Power of Generative AI' on 02 April 2026, Thursday (Virtually).",
      eventCoordinatorName: "DR. JAYSHRI A. PATIL",
      deanName: "DR. NIRAJ SHAH"
    }
  },
  {
    name: "2. Long Resource Person",
    data: {
      resourcePerson: "Prof. Dr. Alexandra H. Dangerfield-Wellington, Senior Principal AI Scientist & Distinguished Research Chair in Machine Learning, Department of Computer Science & Robotics, MIT & Stanford University Labs"
    }
  },
  {
    name: "3. Long Event Name",
    data: {
      eventName: "INTERNATIONAL SYMPOSIUM ON ADVANCED GENERATIVE ARTIFICIAL INTELLIGENCE, QUANTUM COMPUTING FRAMEWORKS, AND NEXT-GEN NEURAL NETWORK ARCHITECTURES FOR ENTERPRISE APPLIED CLOUD COMPUTING 2026"
    }
  },
  {
    name: "4. Long Attendee Text",
    data: {
      attendee: "Undergraduate Students, Postgraduate Research Scholars, PhD Candidates, Faculty Members from School of Engineering, Department of Computer Engineering, IT, AI-DS, Cyber Security, and Allied Interdisciplinary Branches"
    }
  },
  {
    name: "5. Long Outline",
    data: {
      eventOutline: "The comprehensive technical talk provided an exhaustive exploration into contemporary prompt engineering practices, large language model fine-tuning methodologies, context window optimization strategies, zero-shot and few-shot reasoning models, and agentic workflows. Participants engaged in live demonstration exercises, analyzing multi-step prompt chains, RAG architectures, and ethical AI deployment patterns across healthcare, finance, and industrial automation."
    }
  },
  {
    name: "6. Eight Objectives",
    data: {
      eventObjectives: [
        "Objective 1: Understand fundamental LLM architectures and attention mechanisms.",
        "Objective 2: Master system-level prompt formulation and context conditioning.",
        "Objective 3: Explore Retrieval-Augmented Generation (RAG) pipelines.",
        "Objective 4: Analyze guardrails, safety filters, and alignment techniques.",
        "Objective 5: Investigate agentic tool-use and autonomous subagent orchestration.",
        "Objective 6: Assess benchmark evaluation methodologies for LLM outputs.",
        "Objective 7: Examine enterprise privacy, data governance, and IP protection.",
        "Objective 8: Formulate domain-specific AI strategies for academic projects."
      ]
    }
  },
  {
    name: "7. Eight Outcomes",
    data: {
      eventOutcomes: [
        "Outcome 1: Participants built functional multi-turn prompt templates.",
        "Outcome 2: Attendees evaluated vector database embeddings for RAG systems.",
        "Outcome 3: Students constructed zero-shot and chain-of-thought prompts.",
        "Outcome 4: Researchers analyzed LLM hallucination mitigation strategies.",
        "Outcome 5: Developers implemented local open-weight model inferencing.",
        "Outcome 6: Teams created automated benchmark test suits for prompt validation.",
        "Outcome 7: Participants addressed AI bias, fairness, and safety guidelines.",
        "Outcome 8: Attendees synthesized key learnings into upcoming capstone projects."
      ]
    }
  },
  {
    name: "8. No Photos",
    data: {
      photos: []
    }
  },
  {
    name: "9. One Photo",
    data: {
      photos: ["https://picsum.photos/800/600"]
    }
  },
  {
    name: "10. Two Photos",
    data: {
      photos: ["https://picsum.photos/800/600", "https://picsum.photos/800/601"]
    }
  },
  {
    name: "11. Long Caption",
    data: {
      photoCaption: "Interactive hands-on session during the International Expert Talk on Prompt Engineering and Generative AI attended by 245 students, faculty delegates, and industry dignitaries on 02 April 2026, Thursday at Main Auditorium (Virtually)."
    }
  },
  {
    name: "12. Long Coordinator & Dean Names",
    data: {
      eventCoordinatorName: "DR. JAYSHRI A. PATIL (HEAD OF DEPARTMENT & EVENT CONVENER)",
      deanName: "DR. NIRAJ SHAH (DEAN & DISTINGUISHED PROFESSOR OF ENGINEERING)"
    }
  }
];

function EventReportPdfTestPanel() {
  if (!import.meta.env.DEV) return null;

  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  const baseReport = testCases[0].data;
  const currentCase = testCases[activeCaseIdx];

  const mergedReportData = {
    ...baseReport,
    ...currentCase.data
  };

  return (
    <div className="my-8 rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-6 space-y-4 shadow-md">
      <div className="flex items-center justify-between border-b border-blue-200 pb-3">
        <div>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
            DEV ONLY TEST SUITE
          </span>
          <h4 className="mt-1 text-xl font-black text-slate-900 font-sans">
            Event Report Direct PDF QA Panel
          </h4>
        </div>
        <button
          onClick={() =>
            downloadEventReportPdf(
              mergedReportData,
              `Test_Report_${currentCase.name}.pdf`
            )
          }
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white hover:bg-blue-700 transition shadow-sm"
        >
          Download Test PDF
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
          Select Edge Case Scenario ({testCases.length})
        </label>
        <select
          value={activeCaseIdx}
          onChange={(e) => setActiveCaseIdx(Number(e.target.value))}
          className="w-full rounded-xl border border-blue-200 bg-white p-2.5 text-xs font-bold text-slate-800"
        >
          {testCases.map((tc, idx) => (
            <option key={tc.name} value={idx}>
              {tc.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EventReportPdfTestPanel;

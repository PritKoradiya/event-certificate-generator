import React from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_BASE = API_BASE.replace("/api", "");

/**
 * Resolves local file urls or backend uploaded asset paths to full URLs.
 */
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("blob:") || path.startsWith("data:") || path.startsWith("http")) {
    return path;
  }
  if (path.startsWith("/uploads")) {
    return `${SERVER_BASE}${path}`;
  }
  return path;
};

export default function EventReportPreview({ data = {} }) {
  // Support both frontend and backend field names
  const reportDate = data.reportDate || "";
  const dateOfEvent = data.dateOfEvent || data.eventDate || "";
  const time = data.time || data.eventTime || "";
  const resourcePerson = data.resourcePerson || "";
  const eventName = data.eventName || "";
  const noOfParticipants = data.noOfParticipants || data.numberOfParticipants || "";
  const attendee = data.attendee || "";
  const venue = data.venue || "";
  const eventOutline = data.eventOutline || "";
  
  const objectives = data.objectives || data.eventObjectives || "";
  const outcomes = data.outcomes || data.eventOutcomes || "";
  
  const photoCaption = data.photoCaption || "";
  const eventCoordinator = data.eventCoordinator || data.eventCoordinatorName || "DR. JAYSHRI A. PATIL";
  const deanName = data.deanName || "DR. NIRAJ SHAH";
  const photos = data.photos || [];

  const defaultCaption = `Expert talk "${eventName || "[Event Name]"}" on ${dateOfEvent || "[Event Date]"}.`;
  const displayCaption = photoCaption || defaultCaption;

  // Map the first two photos
  const photo1 = photos[0] ? getAssetUrl(photos[0]) : null;
  const photo2 = photos[1] ? getAssetUrl(photos[1]) : null;

  const renderBulletList = (textOrArray, placeholder) => {
    let lines = [];
    if (Array.isArray(textOrArray)) {
      lines = textOrArray.map((line) => line.trim()).filter((line) => line.length > 0);
    } else if (typeof textOrArray === "string" && textOrArray.trim()) {
      lines = textOrArray
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }

    if (lines.length === 0) {
      return (
        <ul className="list-disc pl-6 space-y-1 text-slate-400 italic font-serif">
          <li>{placeholder}</li>
        </ul>
      );
    }

    return (
      <ul className="list-disc pl-6 space-y-1 text-slate-900 font-serif">
        {lines.map((line, idx) => (
          <li key={idx} className="leading-relaxed text-sm sm:text-base text-justify">
            {line}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-8 flex flex-col gap-12 items-center w-full">
      {/* Page 1 */}
      <div
        id="event-report-page-1"
        className="w-full max-w-[850px] aspect-[210/297] bg-white text-slate-900 border border-slate-300 shadow-2xl p-10 sm:p-14 font-serif relative flex flex-col justify-between box-border"
        style={{ minHeight: "1120px" }}
      >
        <span className="absolute top-4 right-6 text-xs font-sans text-slate-400 select-none print:hidden">Page 1 of 2</span>

        <div className="flex-1 flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-center uppercase mb-6 text-slate-950 border-b border-slate-950 pb-2">
            EVENT REPORT
          </h1>

          <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2.5 text-xs sm:text-sm border-b border-slate-200 pb-4 mb-4">
            <div className="font-bold text-slate-800">Date:</div>
            <div className="text-slate-950">{reportDate || <span className="text-slate-400 italic">[Report Date]</span>}</div>

            <div className="font-bold text-slate-800">Date of event:</div>
            <div className="text-slate-950">{dateOfEvent || <span className="text-slate-400 italic">[Date of Event]</span>}</div>

            <div className="font-bold text-slate-800">Time:</div>
            <div className="text-slate-950">{time || <span className="text-slate-400 italic">[Time]</span>}</div>

            <div className="font-bold text-slate-800">Resource Person:</div>
            <div className="text-slate-950">{resourcePerson || <span className="text-slate-400 italic">[Resource Person Details]</span>}</div>

            <div className="font-bold text-slate-800">Name of the Event</div>
            <div className="text-slate-950 font-semibold">{eventName || <span className="text-slate-400 italic">[Name of the Event]</span>}</div>

            <div className="font-bold text-slate-800">No of participants</div>
            <div className="text-slate-950">{noOfParticipants || <span className="text-slate-400 italic">[No. of Participants]</span>}</div>

            <div className="font-bold text-slate-800">Attendee:</div>
            <div className="text-slate-950">{attendee || <span className="text-slate-400 italic">[Target Audience / Attendees]</span>}</div>

            <div className="font-bold text-slate-800">Venue:</div>
            <div className="text-slate-950">{venue || <span className="text-slate-400 italic">[Venue]</span>}</div>
          </div>

          <div className="space-y-4 flex-1 text-xs sm:text-sm">
            <div>
              <h2 className="font-bold text-slate-950 mb-1 border-b border-slate-200 pb-0.5 uppercase tracking-wide">
                Event Outline:
              </h2>
              {eventOutline && eventOutline.trim() ? (
                <p className="whitespace-pre-line text-slate-900 leading-relaxed text-justify font-serif">
                  {eventOutline}
                </p>
              ) : (
                <p className="text-slate-400 italic font-serif">[Enter event outline and details here...]</p>
              )}
            </div>

            <div>
              <h2 className="font-bold text-slate-950 mb-1 border-b border-slate-200 pb-0.5 uppercase tracking-wide">
                Objective of the Event:
              </h2>
              {renderBulletList(objectives, "[Enter event objectives, one per line...]")}
            </div>

            <div>
              <h2 className="font-bold text-slate-950 mb-1 border-b border-slate-200 pb-0.5 uppercase tracking-wide">
                Outcome of the Event:
              </h2>
              {renderBulletList(outcomes, "[Enter event outcomes, one per line...]")}
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div
        id="event-report-page-2"
        className="w-full max-w-[850px] aspect-[210/297] bg-white text-slate-900 border border-slate-300 shadow-2xl p-10 sm:p-14 font-serif relative flex flex-col justify-between box-border"
        style={{ minHeight: "1120px" }}
      >
        <span className="absolute top-4 right-6 text-xs font-sans text-slate-400 select-none print:hidden">Page 2 of 2</span>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-center uppercase mb-6 text-slate-950 underline underline-offset-8">
              PHOTOS
            </h1>

            <div className="flex flex-col gap-5 my-4">
              {/* Photo 1 Slot */}
              <div className="w-full h-[260px] sm:h-[300px] bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center overflow-hidden">
                {photo1 ? (
                  <img src={photo1} className="w-full h-full object-cover" alt="Event Photo 1" />
                ) : (
                  <div className="text-center font-sans text-slate-400">
                    <span className="text-3xl block mb-1">📷</span>
                    <p className="text-xs font-bold uppercase tracking-wide">Photo 1 Placeholder</p>
                  </div>
                )}
              </div>

              {/* Photo 2 Slot */}
              <div className="w-full h-[260px] sm:h-[300px] bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center overflow-hidden">
                {photo2 ? (
                  <img src={photo2} className="w-full h-full object-cover" alt="Event Photo 2" />
                ) : (
                  <div className="text-center font-sans text-slate-400">
                    <span className="text-3xl block mb-1">📷</span>
                    <p className="text-xs font-bold uppercase tracking-wide">Photo 2 Placeholder</p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center font-bold text-slate-950 text-sm sm:text-base mb-6 font-serif leading-relaxed px-4">
              {displayCaption}
            </p>
          </div>

          {/* Signature section pushed to bottom */}
          <div className="mt-auto pt-6 pb-2 grid grid-cols-2 gap-8 text-xs sm:text-sm font-bold font-sans">
            <div className="text-left flex flex-col justify-end min-h-[70px]">
              <p className="uppercase tracking-wider text-slate-950 text-[10px] sm:text-xs font-bold">EVENT COORDINATOR</p>
              <div className="border-t border-slate-400 mt-6 pt-1.5">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{eventCoordinator}</p>
              </div>
            </div>
            <div className="text-right flex flex-col justify-end items-end min-h-[70px]">
              <p className="uppercase tracking-wider text-slate-950 text-[10px] sm:text-xs font-bold">DEAN, SOE</p>
              <div className="border-t border-slate-400 mt-6 pt-1.5 w-full max-w-[200px]">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{deanName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

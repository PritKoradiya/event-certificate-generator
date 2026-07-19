import React from "react";

export default function EventReportPreview({ data = {} }) {
  const {
    reportDate = "",
    dateOfEvent = "",
    time = "",
    resourcePerson = "",
    eventName = "",
    noOfParticipants = "",
    attendee = "",
    venue = "",
    eventOutline = "",
    objectives = "",
    outcomes = "",
    photoCaption = "",
    eventCoordinator = "DR. JAYSHRI A. PATIL",
    deanName = "DR. NIRAJ SHAH"
  } = data;

  const renderBulletList = (text, placeholder) => {
    if (!text || !text.trim()) {
      return (
        <ul className="list-disc pl-6 space-y-1.5 text-slate-400 italic">
          <li>{placeholder}</li>
        </ul>
      );
    }
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    
    if (lines.length === 0) {
      return (
        <ul className="list-disc pl-6 space-y-1.5 text-slate-400 italic">
          <li>{placeholder}</li>
        </ul>
      );
    }

    return (
      <ul className="list-disc pl-6 space-y-1.5">
        {lines.map((line, idx) => (
          <li key={idx} className="text-slate-800 leading-relaxed">{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-8 flex flex-col gap-10 items-center w-full">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider">Live Document Preview</h3>
        <p className="text-sm text-slate-400">This simulates how the generated report will look.</p>
      </div>

      {/* Page 1 */}
      <div className="w-full max-w-[800px] bg-white text-slate-900 border border-slate-200 shadow-xl rounded-sm p-10 sm:p-16 font-serif relative min-h-[1050px] flex flex-col">
        {/* Page indicator */}
        <span className="absolute top-4 right-6 text-xs font-sans text-slate-400 select-none">Page 1 of 2</span>

        <h1 className="text-3xl font-bold tracking-wider text-center uppercase mb-10 text-slate-950 border-b-2 border-double border-slate-900 pb-4">
          EVENT REPORT
        </h1>

        <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-3.5 text-base border-b border-slate-200 pb-8 mb-8">
          <div className="font-bold text-slate-800">Date:</div>
          <div className="text-slate-900">{reportDate || <span className="text-slate-400 italic">[Report Date]</span>}</div>

          <div className="font-bold text-slate-800">Date of event:</div>
          <div className="text-slate-900">{dateOfEvent || <span className="text-slate-400 italic">[Date of Event]</span>}</div>

          <div className="font-bold text-slate-800">Time:</div>
          <div className="text-slate-900">{time || <span className="text-slate-400 italic">[Time]</span>}</div>

          <div className="font-bold text-slate-800">Resource Person:</div>
          <div className="text-slate-900">{resourcePerson || <span className="text-slate-400 italic">[Resource Person Details]</span>}</div>

          <div className="font-bold text-slate-800">Name of the Event:</div>
          <div className="text-slate-900 font-semibold">{eventName || <span className="text-slate-400 italic">[Name of the Event]</span>}</div>

          <div className="font-bold text-slate-800">No of participants:</div>
          <div className="text-slate-900">{noOfParticipants || <span className="text-slate-400 italic">[No. of Participants]</span>}</div>

          <div className="font-bold text-slate-800">Attendee:</div>
          <div className="text-slate-900">{attendee || <span className="text-slate-400 italic">[Target Audience / Attendees]</span>}</div>

          <div className="font-bold text-slate-800">Venue:</div>
          <div className="text-slate-900">{venue || <span className="text-slate-400 italic">[Venue]</span>}</div>
        </div>

        <div className="space-y-8 flex-1">
          <div>
            <h2 className="text-xl font-bold text-slate-950 mb-3 border-b border-slate-200 pb-1 uppercase tracking-wide">
              Event Outline
            </h2>
            {eventOutline && eventOutline.trim() ? (
              <p className="whitespace-pre-line text-slate-800 leading-relaxed text-justify">
                {eventOutline}
              </p>
            ) : (
              <p className="text-slate-400 italic">[Enter event outline and details here...]</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-950 mb-3 border-b border-slate-200 pb-1 uppercase tracking-wide">
              Objective of the Event
            </h2>
            {renderBulletList(objectives, "[Enter event objectives, one per line...]")}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-950 mb-3 border-b border-slate-200 pb-1 uppercase tracking-wide">
              Outcome of the Event
            </h2>
            {renderBulletList(outcomes, "[Enter event outcomes, one per line...]")}
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="w-full max-w-[800px] bg-white text-slate-900 border border-slate-200 shadow-xl rounded-sm p-10 sm:p-16 font-serif relative min-h-[1050px] flex flex-col">
        {/* Page indicator */}
        <span className="absolute top-4 right-6 text-xs font-sans text-slate-400 select-none">Page 2 of 2</span>

        <h1 className="text-3xl font-bold tracking-wider text-center uppercase mb-10 text-slate-950 border-b-2 border-double border-slate-900 pb-4">
          PHOTOS
        </h1>

        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 aspect-[4/3] p-6 text-slate-400 font-sans">
              <span className="text-5xl mb-3">🖼️</span>
              <span className="text-sm font-semibold tracking-wide uppercase">Photo 1 Placeholder</span>
              <span className="text-xs text-slate-400 mt-1">Ready for next step</span>
            </div>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 aspect-[4/3] p-6 text-slate-400 font-sans">
              <span className="text-5xl mb-3">🖼️</span>
              <span className="text-sm font-semibold tracking-wide uppercase">Photo 2 Placeholder</span>
              <span className="text-xs text-slate-400 mt-1">Ready for next step</span>
            </div>
          </div>

          <p className="text-center font-bold italic text-slate-700 text-lg mb-12 py-3 px-4 border border-slate-100 bg-slate-50/50 rounded-lg">
            {photoCaption || <span className="text-slate-400 italic font-normal">[Enter Photo Caption]</span>}
          </p>

          {/* Signature section pushed to bottom */}
          <div className="mt-auto pt-24 grid grid-cols-2 gap-8 text-base font-bold font-sans">
            <div className="text-left flex flex-col justify-between h-32">
              <p className="uppercase tracking-wider text-slate-900 text-sm">EVENT COORDINATOR</p>
              <div className="border-t border-slate-400 pt-3">
                <p className="font-bold text-slate-800 text-base">{eventCoordinator || "DR. JAYSHRI A. PATIL"}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">Signature</p>
              </div>
            </div>
            <div className="text-right flex flex-col justify-between h-32 items-end">
              <p className="uppercase tracking-wider text-slate-900 text-sm">DEAN, SOE</p>
              <div className="border-t border-slate-400 pt-3 w-full max-w-[240px]">
                <p className="font-bold text-slate-800 text-base">{deanName || "DR. NIRAJ SHAH"}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

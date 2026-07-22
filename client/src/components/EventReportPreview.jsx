import React from "react";
import { normalizeEventReportData } from "../utils/normalizeEventReportData.js";
import { formatDateForReport, formatDateNumeric } from "../utils/formatReportDate.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_BASE = API_BASE.replace("/api", "");

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

/**
 * EventReportPageOnePreview
 * Renders exact Page 1 of the formal mentor academic report.
 */
function EventReportPageOnePreview({ report }) {
  const formattedReportDate = report.reportDate ? formatDateNumeric(report.reportDate) : "03/04/2026";

  return (
    <div
      className="w-full max-w-[794px] min-h-[1123px] bg-white text-black p-[60px] font-serif shadow-xl box-border relative flex flex-col justify-between"
      style={{ fontFamily: "Times New Roman, Times, serif" }}
    >
      <div>
        {/* Top Header Title */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold uppercase tracking-wide inline-block border-b-2 border-black pb-0.5">
            EVENT REPORT
          </h1>
        </div>

        {/* Report Date (Top Right) */}
        <div className="text-right font-bold text-sm mb-2">
          <span>Date: </span>
          <span className="font-normal">{formattedReportDate}</span>
        </div>

        {/* Details Table Grid */}
        <div className="border border-black text-xs sm:text-sm mb-4">
          {/* Row 1 */}
          <div className="grid grid-cols-[130px_160px_1fr] border-b border-black divide-x divide-black min-h-[50px]">
            <div className="p-2">
              <span className="font-bold block">Date of event:</span>
              <span className="block mt-1">{report.eventDate ? formatDateNumeric(report.eventDate) : ""}</span>
            </div>
            <div className="p-2">
              <span className="font-bold block">Time:</span>
              <span className="block mt-1">{report.eventTime || ""}</span>
            </div>
            <div className="p-2">
              <span className="font-bold block">Resource Person:</span>
              <span className="block mt-1 leading-snug">{report.resourcePerson || ""}</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-[160px_1fr] border-b border-black divide-x divide-black min-h-[40px]">
            <div className="p-2 font-bold flex items-center">
              Name of the Event
            </div>
            <div className="p-2 font-bold leading-snug flex items-center">
              {report.eventName || ""}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-[160px_1fr] divide-x divide-black min-h-[32px]">
            <div className="p-2 font-bold flex items-center">
              No of participants
            </div>
            <div className="p-2 flex items-center">
              {report.numberOfParticipants || ""}
            </div>
          </div>
        </div>

        {/* Attendee & Venue */}
        <div className="space-y-1 text-xs sm:text-sm mb-4">
          <div>
            <span className="font-bold">Attendee: </span>
            <span>{report.attendee || ""}</span>
          </div>
          <div>
            <span className="font-bold">Venue: </span>
            <span>{report.venue || ""}</span>
          </div>
        </div>

        {/* Event Outline */}
        <div className="mb-4">
          <h2 className="font-bold text-sm sm:text-base mb-1">Event Outline:</h2>
          <p className="text-xs sm:text-sm text-justify leading-relaxed whitespace-pre-line">
            {report.eventOutline || ""}
          </p>
        </div>

        {/* Objective of the Event */}
        <div className="mb-4">
          <h2 className="font-bold text-sm sm:text-base mb-1">Objective of the Event:</h2>
          <ul className="list-none space-y-1 pl-1 text-xs sm:text-sm">
            {(report.eventObjectives || []).map((obj, idx) => (
              <li key={idx} className="flex gap-2 text-justify leading-relaxed">
                <span>•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome of the Event */}
        <div className="mb-4">
          <h2 className="font-bold text-sm sm:text-base mb-1">Outcome of the Event:</h2>
          <ul className="list-none space-y-1 pl-1 text-xs sm:text-sm">
            {(report.eventOutcomes || []).map((out, idx) => (
              <li key={idx} className="flex gap-2 text-justify leading-relaxed">
                <span>•</span>
                <span>{out}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * EventReportPageTwoPreview
 * Renders exact Page 2 of the formal mentor academic report.
 */
function EventReportPageTwoPreview({ report }) {
  const photo1 = report.photos[0] ? getAssetUrl(report.photos[0]) : null;
  const photo2 = report.photos[1] ? getAssetUrl(report.photos[1]) : null;

  const formattedEventDate = report.eventDate ? formatDateForReport(report.eventDate) : "02 April 2026";
  const defaultCaption = `Expert talk “${report.eventName || "Event Name"}” on ${formattedEventDate}.`;
  const displayCaption = report.photoCaption || defaultCaption;

  return (
    <div
      className="w-full max-w-[794px] min-h-[1123px] bg-white text-black p-[60px] font-serif shadow-xl box-border relative flex flex-col justify-between"
      style={{ fontFamily: "Times New Roman, Times, serif" }}
    >
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Top Heading: PHOTOS */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold uppercase tracking-wide inline-block border-b-2 border-black pb-0.5">
              PHOTOS
            </h1>
          </div>

          {/* Vertically Stacked Photos */}
          <div className="flex flex-col items-center gap-6 mb-6">
            {/* Photo 1 Slot */}
            <div className="w-[80%] h-[240px] bg-slate-50 border border-slate-300 flex items-center justify-center overflow-hidden">
              {photo1 ? (
                <img src={photo1} className="w-full h-full object-contain" alt="Event Photo 1" />
              ) : (
                <div className="text-center text-slate-400 font-sans text-xs font-bold uppercase">
                  PHOTO 1
                </div>
              )}
            </div>

            {/* Photo 2 Slot */}
            <div className="w-[80%] h-[240px] bg-slate-50 border border-slate-300 flex items-center justify-center overflow-hidden">
              {photo2 ? (
                <img src={photo2} className="w-full h-full object-contain" alt="Event Photo 2" />
              ) : (
                <div className="text-center text-slate-400 font-sans text-xs font-bold uppercase">
                  PHOTO 2
                </div>
              )}
            </div>
          </div>

          {/* Caption */}
          <p className="text-center font-bold text-xs sm:text-sm px-6 leading-relaxed max-w-2xl mx-auto">
            {displayCaption}
          </p>
        </div>

        {/* Signatures at bottom (NO lines, NO boxes) */}
        <div className="pt-12 pb-4 flex justify-between items-end font-bold text-xs sm:text-sm">
          <div>
            <p className="uppercase">EVENT COORDINATOR</p>
            <p className="uppercase mt-2">{report.eventCoordinatorName || "DR. JAYSHRI A. PATIL"}</p>
          </div>
          <div className="text-right">
            <p className="uppercase">DEAN, SOE</p>
            <p className="uppercase mt-2">{report.deanName || "DR. NIRAJ SHAH"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventReportPreview({ data = {} }) {
  const normalizedReport = normalizeEventReportData(data);

  return (
    <div className="my-8 flex flex-col items-center gap-8 w-full">
      <EventReportPageOnePreview report={normalizedReport} />
      <EventReportPageTwoPreview report={normalizedReport} />
    </div>
  );
}

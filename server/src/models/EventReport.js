import mongoose from "mongoose";

const isRequiredForGeneratedReport = function () {
  return this.status !== "Draft";
};

const eventReportSchema = new mongoose.Schema(
  {
    reportDate: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    eventDate: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    eventTime: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    resourcePerson: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    eventName: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    numberOfParticipants: {
      type: Number,
      required: isRequiredForGeneratedReport
    },
    attendee: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    venue: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    eventOutline: {
      type: String,
      required: isRequiredForGeneratedReport,
      trim: true
    },
    eventObjectives: {
      type: [String],
      default: []
    },
    eventOutcomes: {
      type: [String],
      default: []
    },
    photoCaption: {
      type: String,
      trim: true
    },
    photos: {
      type: [String],
      default: []
    },
    eventCoordinatorName: {
      type: String,
      default: "DR. JAYSHRI A. PATIL",
      trim: true
    },
    deanName: {
      type: String,
      default: "DR. NIRAJ SHAH",
      trim: true
    },
    reportId: {
      type: String,
      unique: true
    },
    status: {
      type: String,
      enum: ["Draft", "Generated"],
      default: "Generated"
    }
  },
  {
    timestamps: true
  }
);

const EventReport = mongoose.model("EventReport", eventReportSchema);

export default EventReport;

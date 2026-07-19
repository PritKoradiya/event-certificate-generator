import mongoose from "mongoose";
import EventReport from "../models/EventReport.js";

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const createReportIdFromNumber = (year, number) => {
  return `REPORT-${year}-${String(number).padStart(4, "0")}`;
};

const generateReportId = async () => {
  const year = new Date().getFullYear();
  const reportIdPrefix = `REPORT-${year}-`;
  const latestReport = await EventReport.findOne({
    reportId: new RegExp(`^${reportIdPrefix}`)
  }).sort({ reportId: -1 });

  if (!latestReport?.reportId) {
    return createReportIdFromNumber(year, 1);
  }

  const latestNumber = Number(latestReport.reportId.replace(reportIdPrefix, ""));
  const nextNumber = Number.isNaN(latestNumber) ? 1 : latestNumber + 1;

  return createReportIdFromNumber(year, nextNumber);
};

const requiredFields = [
  "reportDate",
  "eventDate",
  "eventTime",
  "resourcePerson",
  "eventName",
  "numberOfParticipants",
  "attendee",
  "venue",
  "eventOutline"
];

const isMissingRequiredValue = (value) => {
  return value === undefined || value === null || (typeof value === "string" && !value.trim());
};

const databaseUnavailableResponse = (res) => {
  return res.status(503).json({
    success: false,
    message: "Database is not connected. Please set MONGO_URI and restart the server."
  });
};

export const createEventReport = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const missingFields = requiredFields.filter((field) => isMissingRequiredValue(req.body[field]));

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    const reportId = await generateReportId();
    const eventReport = await EventReport.create({
      ...req.body,
      reportId,
      status: "Generated"
    });

    return res.status(201).json({
      success: true,
      message: "Event report created successfully",
      data: eventReport
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create event report",
      error: error.message
    });
  }
};

export const saveDraftEventReport = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const reportId = await generateReportId();
    const eventReport = await EventReport.create({
      ...req.body,
      reportId,
      status: "Draft"
    });

    return res.status(201).json({
      success: true,
      message: "Event report draft saved successfully",
      data: eventReport
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save event report draft",
      error: error.message
    });
  }
};

export const getEventReports = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const eventReports = await EventReport.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: eventReports.length,
      data: eventReports
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event reports",
      error: error.message
    });
  }
};

export const getEventReportById = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const eventReport = await EventReport.findById(req.params.id);

    if (!eventReport) {
      return res.status(404).json({
        success: false,
        message: "Event report not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: eventReport
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event report",
      error: error.message
    });
  }
};

export const updateEventReport = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const existingEventReport = await EventReport.findById(req.params.id);

    if (!existingEventReport) {
      return res.status(404).json({
        success: false,
        message: "Event report not found"
      });
    }

    const updateData = {
      ...req.body,
      reportId: existingEventReport.reportId
    };

    const updatedEventReport = await EventReport.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: "Event report updated successfully",
      data: updatedEventReport
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update event report",
      error: error.message
    });
  }
};

export const deleteEventReport = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const deletedEventReport = await EventReport.findByIdAndDelete(req.params.id);

    if (!deletedEventReport) {
      return res.status(404).json({
        success: false,
        message: "Event report not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event report deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete event report",
      error: error.message
    });
  }
};

import { unlink } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import EventReport from "../models/EventReport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportUploadsDirectory = path.join(__dirname, "../../uploads/event-reports");

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

const getUploadedPhotoPaths = (files = []) => {
  return files.map((file) => `/uploads/event-reports/${file.filename}`);
};

const removeEmptyArrayItems = (values) => {
  return values.map((value) => String(value).trim()).filter(Boolean);
};

const parseArrayField = (value) => {
  if (Array.isArray(value)) {
    return removeEmptyArrayItems(value);
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);

    if (Array.isArray(parsedValue)) {
      return removeEmptyArrayItems(parsedValue);
    }
  } catch {
    // A regular multiline string is handled below.
  }

  return removeEmptyArrayItems(value.split(/\r?\n/));
};

const deleteUploadedFile = async (photoPath) => {
  if (typeof photoPath !== "string" || !photoPath.startsWith("/uploads/event-reports/")) {
    return;
  }

  const fileName = path.basename(photoPath);
  const localFilePath = path.join(reportUploadsDirectory, fileName);

  try {
    await unlink(localFilePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Unable to delete uploaded report photo: ${localFilePath}`, error.message);
    }
  }
};

const buildReportPhotos = (files, bodyPhotos) => {
  const uploadedPhotos = getUploadedPhotoPaths(files);
  const savedPhotoPaths = parseArrayField(bodyPhotos);

  return [...new Set([...uploadedPhotos, ...savedPhotoPaths])].slice(0, 4);
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
      eventObjectives: parseArrayField(req.body.eventObjectives),
      eventOutcomes: parseArrayField(req.body.eventOutcomes),
      photos: buildReportPhotos(req.files, req.body.photos),
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
      eventObjectives: parseArrayField(req.body.eventObjectives),
      eventOutcomes: parseArrayField(req.body.eventOutcomes),
      photos: buildReportPhotos(req.files, req.body.photos),
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

    const existingPhotos = Array.isArray(existingEventReport.photos)
      ? existingEventReport.photos
      : [];
    const removePhotos = parseArrayField(req.body.removePhotos);
    const removePhotosSet = new Set(removePhotos);
    const selectedPhotosToDelete = existingPhotos.filter((photo) => removePhotosSet.has(photo));
    const remainingPhotos = existingPhotos.filter((photo) => !removePhotosSet.has(photo));
    const uploadedPhotos = getUploadedPhotoPaths(req.files);
    const combinedPhotos = [...remainingPhotos, ...uploadedPhotos];
    const photos = combinedPhotos.slice(0, 4);
    const extraPhotos = combinedPhotos.slice(4);

    const { eventObjectives, eventOutcomes, ...normalFields } = req.body;
    delete normalFields.photos;
    delete normalFields.removePhotos;
    delete normalFields.reportId;

    const updateData = {
      ...normalFields,
      photos,
      reportId: existingEventReport.reportId
    };

    if (eventObjectives !== undefined) {
      updateData.eventObjectives = parseArrayField(eventObjectives);
    }

    if (eventOutcomes !== undefined) {
      updateData.eventOutcomes = parseArrayField(eventOutcomes);
    }

    const updatedEventReport = await EventReport.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    const photosToDelete = [...new Set([...selectedPhotosToDelete, ...extraPhotos])];
    await Promise.all(photosToDelete.map(deleteUploadedFile));

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

    const existingEventReport = await EventReport.findById(req.params.id);

    if (!existingEventReport) {
      return res.status(404).json({
        success: false,
        message: "Event report not found"
      });
    }

    const reportPhotos = Array.isArray(existingEventReport.photos)
      ? existingEventReport.photos
      : [];

    await Promise.all(reportPhotos.map(deleteUploadedFile));
    await EventReport.findByIdAndDelete(req.params.id);

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

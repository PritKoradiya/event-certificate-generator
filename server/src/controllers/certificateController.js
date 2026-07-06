import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const generateCertificateId = async () => {
  const certificateCount = await Certificate.countDocuments();
  const nextNumber = String(certificateCount + 1).padStart(4, "0");

  return `CERT-2026-${nextNumber}`;
};

const requiredFields = [
  "participantName",
  "organizationName",
  "eventName",
  "certificateCategory",
  "certificateTitle",
  "eventDate",
  "templateStyle"
];

export const createCertificate = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please set MONGO_URI and restart the server."
      });
    }

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    const certificateId = await generateCertificateId();
    const certificate = await Certificate.create({
      ...req.body,
      authorizedSignatureName: req.body.authorizedSignatureName || "Authorized Person",
      certificateId
    });

    return res.status(201).json({
      success: true,
      message: "Certificate generated successfully",
      data: certificate
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate certificate",
      error: error.message
    });
  }
};

export const getCertificates = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please set MONGO_URI and restart the server."
      });
    }

    const certificates = await Certificate.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
      error: error.message
    });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please set MONGO_URI and restart the server."
      });
    }

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificate",
      error: error.message
    });
  }
};

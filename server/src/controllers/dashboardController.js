import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";
import EventReport from "../models/EventReport.js";

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

export const getDashboardStats = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please set MONGO_URI and restart the server."
      });
    }

    const [
      totalCertificates,
      generatedCertificates,
      draftCertificates,
      singleCertificates,
      bulkCertificates,
      totalEventReports,
      generatedEventReports,
      draftEventReports
    ] = await Promise.all([
      Certificate.countDocuments(),
      Certificate.countDocuments({ status: "Generated" }),
      Certificate.countDocuments({ status: "Draft" }),
      Certificate.countDocuments({ generationType: "Single" }),
      Certificate.countDocuments({ generationType: "Bulk" }),
      EventReport.countDocuments(),
      EventReport.countDocuments({ status: "Generated" }),
      EventReport.countDocuments({ status: "Draft" })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        certificates: {
          total: totalCertificates,
          generated: generatedCertificates,
          draft: draftCertificates,
          single: singleCertificates,
          bulk: bulkCertificates
        },
        eventReports: {
          total: totalEventReports,
          generated: generatedEventReports,
          draft: draftEventReports
        },
        platform: {
          certificateTemplates: 24,
          posterDesigns: 12,
          modules: 2
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics"
    });
  }
};

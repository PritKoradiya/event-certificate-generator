import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import certificateRoutes from "./routes/certificateRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import eventReportRoutes from "./routes/eventReportRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Basic middleware setup for API requests.
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/health", healthRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/event-reports", eventReportRoutes);

app.get("/", (req, res) => {
  res.send("Event Certificate and Report Generator API");
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Image size must be less than 5MB."
    });
  }

  if (error.message === "Only image files are allowed.") {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  return next(error);
});

export default app;

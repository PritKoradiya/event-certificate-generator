import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import certificateRoutes from "./routes/certificateRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import eventReportRoutes from "./routes/eventReportRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import posterRoutes from "./routes/posterRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(Boolean);

// Basic middleware setup for API requests.
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const corsError = new Error("This origin is not allowed by CORS.");
    corsError.status = 403;
    return callback(corsError);
  },
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/health", healthRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/event-reports", eventReportRoutes);
app.use("/api/posters", posterRoutes);

app.get("/", (req, res) => {
  res.send("Event Certificate and Report Generator API");
});

app.use("/api", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    const message = req.originalUrl.startsWith("/api/posters")
      ? "Poster asset must be smaller than 5MB."
      : "Image size must be less than 5MB.";

    return res.status(400).json({
      success: false,
      message
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  if ([
    "Only image files are allowed.",
    "Only JPG, PNG, and WebP images are allowed."
  ].includes(error.message)) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  const statusCode = error.status || 500;
  const message = process.env.NODE_ENV === "production" && statusCode === 500
    ? "Internal server error"
    : error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message
  });
});

export default app;

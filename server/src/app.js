import cors from "cors";
import express from "express";
import certificateRoutes from "./routes/certificateRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();

// Basic middleware setup for API requests.
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/certificates", certificateRoutes);

app.get("/", (req, res) => {
  res.send("Event Certificate Generator API");
});

export default app;

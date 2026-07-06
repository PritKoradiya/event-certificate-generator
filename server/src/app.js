import cors from "cors";
import express from "express";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();

// Basic middleware setup for API requests.
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

app.get("/", (req, res) => {
  res.send("Event Certificate Generator API");
});

export default app;

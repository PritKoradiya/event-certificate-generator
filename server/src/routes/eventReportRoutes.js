import express from "express";
import {
  createEventReport,
  deleteEventReport,
  getEventReportById,
  getEventReports,
  saveDraftEventReport,
  updateEventReport
} from "../controllers/eventReportController.js";

const router = express.Router();

router.post("/draft", saveDraftEventReport);
router.post("/", createEventReport);
router.get("/", getEventReports);
router.get("/:id", getEventReportById);
router.put("/:id", updateEventReport);
router.delete("/:id", deleteEventReport);

export default router;

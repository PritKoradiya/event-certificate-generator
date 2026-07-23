import express from "express";
import {
  createAttendanceSheet,
  deleteAttendanceSheet,
  duplicateAttendanceSheet,
  getAttendanceSheetById,
  getAttendanceSheets,
  regenerateAttendanceSheet,
  saveDraftAttendanceSheet,
  updateAttendanceSheet
} from "../controllers/attendanceSheetController.js";

const router = express.Router();

router.post("/draft", saveDraftAttendanceSheet);
router.post("/", createAttendanceSheet);
router.post("/:id/regenerate", regenerateAttendanceSheet);
router.post("/:id/duplicate", duplicateAttendanceSheet);
router.get("/", getAttendanceSheets);
router.get("/:id", getAttendanceSheetById);
router.put("/:id", updateAttendanceSheet);
router.delete("/:id", deleteAttendanceSheet);

export default router;

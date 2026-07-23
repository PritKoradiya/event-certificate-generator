import express from "express";
import {
  bulkCreateStudents,
  createStudent,
  deleteStudent,
  deleteStudentsByClass,
  getStudents,
  updateStudent
} from "../controllers/attendanceStudentController.js";

const router = express.Router();

router.post("/bulk", bulkCreateStudents);
router.post("/", createStudent);
router.get("/", getStudents);
router.delete("/class", deleteStudentsByClass);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;

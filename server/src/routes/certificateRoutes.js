import express from "express";
import {
  bulkCreateCertificates,
  createCertificate,
  getCertificateById,
  getCertificates
} from "../controllers/certificateController.js";

const router = express.Router();

router.post("/", createCertificate);
router.post("/bulk", bulkCreateCertificates);
router.get("/", getCertificates);
router.get("/:id", getCertificateById);

export default router;

import express from "express";
import {
  createCertificate,
  getCertificateById,
  getCertificates
} from "../controllers/certificateController.js";

const router = express.Router();

router.post("/", createCertificate);
router.get("/", getCertificates);
router.get("/:id", getCertificateById);

export default router;

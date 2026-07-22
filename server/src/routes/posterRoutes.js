import express from "express";
import {
  createPoster,
  deletePoster,
  getPosterById,
  getPosters,
  saveDraftPoster,
  updatePoster
} from "../controllers/posterController.js";
import uploadPosterAssets from "../middleware/uploadPosterAssets.js";

const router = express.Router();

router.post("/draft", uploadPosterAssets, saveDraftPoster);
router.post("/", uploadPosterAssets, createPoster);
router.get("/", getPosters);
router.get("/:id", getPosterById);
router.put("/:id", uploadPosterAssets, updatePoster);
router.delete("/:id", deletePoster);

export default router;

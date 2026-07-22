import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, "../../uploads/posters");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const extensionsByMimeType = {
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp"
    };
    const extension = extensionsByMimeType[file.mimetype];
    const randomNumber = Math.round(Math.random() * 1_000_000_000);
    const fileName = `poster-asset-${Date.now()}-${randomNumber}${extension}`;

    callback(null, fileName);
  }
});

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileFilter = (req, file, callback) => {
  if (allowedImageTypes.includes(file.mimetype)) {
    return callback(null, true);
  }

  return callback(new Error("Only JPG, PNG, and WebP images are allowed."));
};

const uploadPosterAssets = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default uploadPosterAssets.fields([
  { name: "posterImage", maxCount: 1 },
  { name: "organizationLogo", maxCount: 1 }
]);

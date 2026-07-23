import multer from "multer";

const allowedCsvMimeTypes = new Set([
  "text/csv",
  "application/csv",
  "application/vnd.ms-excel"
]);

const uploadStudentCsv = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (allowedCsvMimeTypes.has(file.mimetype)) {
      return callback(null, true);
    }

    const error = new Error("Only CSV files are allowed.");
    error.status = 400;
    return callback(error);
  }
});

export default uploadStudentCsv.single("studentCsv");

let upload = (req, res, next) => next();

try {
  const multer = require("multer");
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image files are allowed"), false);
  };

  upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
} catch (error) {
  upload = {
    single: () => (req, res, next) => next(),
  };
}

module.exports = upload;
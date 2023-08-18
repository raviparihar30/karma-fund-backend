const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// Create storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create and configure Multer instance
const upload = multer({ storage: storage });

// Middleware for compressing images before saving
const compressImage = (req, res, next) => {
  if (!req.file) {
    // If no file is uploaded, skip compression
    return next();
  }

  // Compress the image using sharp
  sharp(req.file.path)
    .resize(800) // Set the desired width (in pixels) for the compressed image
    .jpeg({ quality: 80 }) // Set the JPEG quality (0-100) for the compressed image
    .toBuffer((err, data, info) => {
      if (err) {
        return next(err);
      }
      // Save the compressed image to disk
      fs.writeFileSync(req.file.path, data);
      next();
    });
};

module.exports = { upload, compressImage };

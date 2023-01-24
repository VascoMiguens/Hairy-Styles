const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // file storage destination
  destination: (req, file, cb) => {
    cb(null, "public/temp");
  },
  // file name attribute
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // allow only jpeg and png files
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

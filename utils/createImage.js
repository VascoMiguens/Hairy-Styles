const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: "10000000" },
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const mimetype = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb("Wrong format type");
//   },
// }).single("image");

module.exports = upload;

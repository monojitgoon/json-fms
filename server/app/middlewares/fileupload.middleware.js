const multer = require("multer");

const jsonFilter = (req, file, callback) => {
  if (file.mimetype.includes("json")) {
    callback(null, true);
  } else {
    callback("Please upload only json file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __basedir + process.env.FILE_PATH  );
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-json-fms-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: jsonFilter });
module.exports = uploadFile;

const multer = require("multer");
const util = require("util");
const { GridFsStorage } = require("multer-gridfs-storage");

const fileUpload = () => {
  var storage = new GridFsStorage({
    url: process.env.MONGODB_URL,

    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return {
        filename: new Date().toISOString() + file.originalname,
      };
    },
  });

  upload = multer({
    storage,
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file) {
      if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|gif|png)$/)) {
        return new Error("Please upload an image");
      }
    },
  });

  return upload;
};
module.exports = fileUpload;

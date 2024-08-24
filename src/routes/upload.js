const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");
const { uploadDisk } = require("../configs/multer");

router.post(
  "/answer-audio",
  uploadDisk.single("audio"),
  UploadController.uploadAudio
);
router.post(
  "/answer-image",
  uploadDisk.single("file"),
  UploadController.uploadThumb
);

module.exports = router;

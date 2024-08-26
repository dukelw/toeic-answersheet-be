const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");
const { uploadDisk } = require("../configs/multer");
const asyncHandler = require("../helpers/async-handler");

router.post(
  "/answer-audio",
  uploadDisk.single("audio"),
  asyncHandler(UploadController.uploadAudio)
);
router.post(
  "/answer-image",
  uploadDisk.single("file"),
  asyncHandler(UploadController.uploadThumb)
);
router.post(
  "/file",
  uploadDisk.single("file"),
  asyncHandler(UploadController.uploadFile)
);

module.exports = router;

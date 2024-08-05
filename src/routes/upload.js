const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");
const { uploadDisk } = require("../configs/multer");

router.post("/answer", uploadDisk.single("file"), UploadController.uploadThumb);

module.exports = router;

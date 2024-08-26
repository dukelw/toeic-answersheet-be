const express = require("express");
const router = express.Router();
const documentController = require("../controllers/DocumentController");
const asyncHandler = require("../helpers/async-handler");

router.post("/create", asyncHandler(documentController.create));
router.post("/update", asyncHandler(documentController.update));
router.get("/find/:id", asyncHandler(documentController.find));
router.delete("/:id", asyncHandler(documentController.delete));
router.get("/", asyncHandler(documentController.getAll));

module.exports = router;

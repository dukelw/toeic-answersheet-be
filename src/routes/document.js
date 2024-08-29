const express = require("express");
const router = express.Router();
const documentController = require("../controllers/DocumentController");
const asyncHandler = require("../helpers/async-handler");
const { authentication } = require("../auth/utils");

router.get("/find/:id", asyncHandler(documentController.find));
router.get("/", asyncHandler(documentController.getAll));

router.use(authentication);
router.post("/create", asyncHandler(documentController.create));
router.post("/update", asyncHandler(documentController.update));
router.delete("/:id", asyncHandler(documentController.delete));

module.exports = router;

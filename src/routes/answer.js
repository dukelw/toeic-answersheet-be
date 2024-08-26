const express = require("express");
const router = express.Router();
const answerController = require("../controllers/AnswerController");
const asyncHandler = require("../helpers/async-handler");

router.post("/create", asyncHandler(answerController.create));
router.post("/update", asyncHandler(answerController.update));
router.get("/find/:id", asyncHandler(answerController.find));
router.delete("/:id", asyncHandler(answerController.delete));
router.get("/", asyncHandler(answerController.getAll));

module.exports = router;

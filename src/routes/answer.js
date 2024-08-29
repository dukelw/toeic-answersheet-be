const express = require("express");
const router = express.Router();
const answerController = require("../controllers/AnswerController");
const asyncHandler = require("../helpers/async-handler");
const { authentication } = require("../auth/utils");

router.get("/find/:id", asyncHandler(answerController.find));
router.get("/", asyncHandler(answerController.getAll));

router.use(authentication);
router.post("/create", asyncHandler(answerController.create));
router.post("/update", asyncHandler(answerController.update));
router.delete("/:id", asyncHandler(answerController.delete));

module.exports = router;

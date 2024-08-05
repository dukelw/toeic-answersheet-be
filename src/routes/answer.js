const express = require("express");
const router = express.Router();
const answerController = require("../controllers/AnswerController");

router.post("/create", answerController.create);
router.get("/find/:id", answerController.find);
router.get("/", answerController.getAll);

module.exports = router;

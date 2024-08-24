const express = require("express");
const router = express.Router();
const answerController = require("../controllers/AnswerController");

router.post("/create", answerController.create);
router.post("/update", answerController.update);
router.get("/find/:id", answerController.find);
router.delete("/:id", answerController.delete);
router.get("/", answerController.getAll);

module.exports = router;

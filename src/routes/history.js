const express = require("express");
const router = express.Router();
const historyController = require("../controllers/HistoryController");
const asyncHandler = require("../helpers/async-handler");

router.get("/get-of-user/:id", asyncHandler(historyController.getAllOfUser));
router.get("/get-of-test/:id", asyncHandler(historyController.getAllOfTest));
router.get("/find-highest", asyncHandler(historyController.findHighest));
router.get(
  "/find-top-single/:id",
  asyncHandler(historyController.getRankOfATest)
);
router.get("/find-top-multi", asyncHandler(historyController.getRankOfAllTest));
router.get("/find", asyncHandler(historyController.find));
router.post("/", asyncHandler(historyController.create));

module.exports = router;

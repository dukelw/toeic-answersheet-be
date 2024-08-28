const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");

const notificationController = require("../controllers/NotificationController");

// Authentication
router.get("/:id", asyncHandler(notificationController.getAll));
router.post("/mark-read", asyncHandler(notificationController.markRead));
router.post("", asyncHandler(notificationController.create));

module.exports = router;

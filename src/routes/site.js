const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");
const asyncHandler = require("../helpers/async-handler");

router.get("/", asyncHandler(siteController.welcome));

module.exports = router;

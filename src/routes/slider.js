const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/SliderController");
const asyncHandler = require("../helpers/async-handler");

router.post("/create", asyncHandler(sliderController.create));
router.post("/update", asyncHandler(sliderController.update));
router.post("/toggle", asyncHandler(sliderController.toggle));
router.get("/find-active", asyncHandler(sliderController.findActive));
router.get("/find/:id", asyncHandler(sliderController.find));
router.get(
  "/collection/:collection",
  asyncHandler(sliderController.findByCollection)
);
router.get("/collection", asyncHandler(sliderController.findCollections));
router.delete(
  "/collection/:collection",
  asyncHandler(sliderController.deleteCollection)
);
router.delete("/:id", asyncHandler(sliderController.delete));
router.get("/", asyncHandler(sliderController.findAll));

module.exports = router;

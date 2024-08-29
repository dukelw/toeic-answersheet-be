const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const userController = require("../controllers/UserController");

router.post("/signin", asyncHandler(userController.signin));
router.post("/signup", asyncHandler(userController.signup));
router.get("/find/:id", asyncHandler(userController.find));
router.get("/", asyncHandler(userController.findAll));

router.use(authentication);
router.post("/logout", asyncHandler(userController.logout));
router.delete("/:id", asyncHandler(userController.delete));
router.post("/change-password", asyncHandler(userController.changePassword));
router.post("/update", asyncHandler(userController.updateInformation));
router.post("/refresh-token", asyncHandler(userController.refreshToken));

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  upload,
  compressImage,
} = require("../middleware/image-upload/multerConfig");

// User registration route
router.post(
  "/register",
  upload.single("profilePhoto"),
  userController.registerUser
);

// User login route
router.post("/login", userController.loginUser);

module.exports = router;

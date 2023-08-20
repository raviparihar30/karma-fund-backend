const express = require("express");
const router = express.Router();
const {
  upload,
  compressImage,
} = require("../middleware/image-upload/multerConfig");
const postController = require("../controllers/postController");
const authenticateJWT = require("../middleware/authenticateJWT");

// Get all blog posts
router.get("/", postController.getAllPosts);

// Create a new blog post
router.post(
  "/",
  authenticateJWT(["admin"]),
  upload.single("image"),
  compressImage,
  postController.createPost
);

// Get a single blog post by ID
router.get("/:postId", postController.getPostById);

// Update a blog post by ID
router.put(
  "/:postId",
  authenticateJWT(["admin"]),
  upload.single("image"),
  compressImage,
  postController.updatePost
);

// Delete a blog post by ID
router.delete(
  "/:postId",
  authenticateJWT(["admin"]),
  postController.deletePost
);

router.post(
  "/:postId/increase-views",
  authenticateJWT(["user"]),
  postController.increaseViewCount
);

router.get(
  "/user/:userId",
  authenticateJWT(["user"]),
  postController.getPostsByUserId
);

module.exports = router;

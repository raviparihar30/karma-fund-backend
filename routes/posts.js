const express = require("express");
const router = express.Router();
const upload = require("../middleware/image-upload/multerConfig");
const postController = require("../controllers/postController");
const authenticateJWT = require("../middleware/authenticateJWT");

// Get all blog posts
router.get("/", authenticateJWT(["user", "admin"]), postController.getAllPosts);

// Create a new blog post
router.post(
  "/",
  authenticateJWT(["admin"]),
  upload.single("image"),
  postController.createPost
);

// Get a single blog post by ID
router.get(
  "/:postId",
  authenticateJWT(["user", "admin"]),
  postController.getPostById
);

// Update a blog post by ID
router.put(
  "/:postId",
  authenticateJWT(["admin"]),
  upload.single("image"),
  postController.updatePost
);

// Delete a blog post by ID
router.delete(
  "/:postId",
  authenticateJWT(["admin"]),
  postController.deletePost
);

module.exports = router;

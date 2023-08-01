const fs = require("fs");
const path = require("path");
const apiResponse = require("../utils/apiResponse");
const Post = require("../models/post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.json(apiResponse(true, "Posts fetched successfully", posts));
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    return res
      .status(500)
      .json(apiResponse(false, "Failed to fetch blog posts"));
  }
};

const createPost = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json(apiResponse(false, "Access denied"));
  }

  const { title, subTitle, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newPost = await Post.create({ title, subTitle, description, image });
    return res.json(apiResponse(true, "Post created successfully", newPost));
  } catch (err) {
    console.error("Error creating a new blog post:", err);
    return res
      .status(500)
      .json(apiResponse(false, "Failed to create a new blog post"));
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json(apiResponse(false, "Blog post not found"));
    }
    return res.json(apiResponse(true, "Blog post fetched successfully", post));
  } catch (err) {
    console.error("Error fetching blog post by ID:", err);
    return res
      .status(500)
      .json(apiResponse(false, "Failed to fetch blog post"));
  }
};

const updatePost = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json(apiResponse(false, "Access denied"));
  }

  const postId = req.params.postId;
  const { title, subTitle, description } = req.body;
  let image = null;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json(apiResponse(false, "Blog post not found"));
    }

    // Delete the previous image if a new one is uploaded
    if (req.file) {
      if (post.image) {
        fs.unlinkSync(path.join(__dirname, "../uploads/", post.image));
      }
      image = req.file.filename;
    }

    post.title = title;
    post.subTitle = subTitle;
    post.description = description;
    post.image = image;
    await post.save();

    return res.json(apiResponse(true, "Blog post updated successfully", post));
  } catch (err) {
    console.error("Error updating blog post:", err);
    return res
      .status(500)
      .json(apiResponse(false, "Failed to update blog post"));
  }
};

const deletePost = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json(apiResponse(false, "Access denied"));
  }

  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json(apiResponse(false, "Blog post not found"));
    }

    // Delete the image file when the post is deleted
    if (post.image) {
      fs.unlinkSync(path.join(__dirname, "../uploads/", post.image));
    }

    await post.destroy();
    return res.json(apiResponse(true, "Blog post deleted successfully"));
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res
      .status(500)
      .json(apiResponse(false, "Failed to delete blog post"));
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};

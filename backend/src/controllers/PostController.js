const mongoose = require("mongoose");
const Post = require("../models/Post");

const buildImageDataUrl = (imageData, imageContentType) => {
  if (!imageData || !imageContentType) {
    return "";
  }

  return `data:${imageContentType};base64,${imageData.toString("base64")}`;
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const payload = {
      title,
      content,
      imageUrl: "",
    };

    if (req.file) {
      payload.imageData = req.file.buffer;
      payload.imageContentType = req.file.mimetype || "image/jpeg";
    }

    const newPost = await Post.create(payload);
    const postObject = newPost.toObject();

    postObject.imageDataUrl = buildImageDataUrl(
      postObject.imageData,
      postObject.imageContentType
    );

    res
      .status(201)
      .json({ message: "Post created successfully", data: postObject });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const postsWithImageDataUrl = posts.map((post) => {
      const postObject = post.toObject();

      postObject.imageDataUrl = buildImageDataUrl(
        postObject.imageData,
        postObject.imageContentType
      );

      return postObject;
    });

    res
      .status(200)
      .json({ message: "Posts fetched successfully", data: postsWithImageDataUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const PostId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(PostId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const deletedPost = await Post.findByIdAndDelete(PostId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopPosts = async (req, res) => {
  try {
    const topPosts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "authorId",
        },
      },
      {
        $unwind: {
          path: "$authorId",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res
      .status(200)
      .json({ message: "Top posts fetched successfully", data: topPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  getTopPosts,
};
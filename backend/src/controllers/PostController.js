const Post = require("../models/post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ message: "Posts fetched successfully", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const PostId = req.params.id;
    await Post.findByIdAndDelete(PostId);
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
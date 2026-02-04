const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.create = async (req, res) => {
  try {
    const { text, postId } = req.body;

    const postExists = await Post.findById(postId);
    if (!postExists) return res.status(400).json({ message: "postId not found" });

    const comment = await Comment.create({ text, postId });
    res.status(201).json(comment);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getAll = async (req, res) => {
  const comments = await Comment.find().populate("postId", "title");
  res.json(comments);
};

exports.getOne = async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate("postId", "title");
  if (!comment) return res.status(404).json({ message: "Not found" });
  res.json(comment);
};

exports.update = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!comment) return res.status(404).json({ message: "Not found" });
  res.json(comment);
};

exports.remove = async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};

const { UserModel } = require("../models/auth");
const { CommentService } = require("../models/comment");

const createComment = async (req, res) => {
  const userId = req.userCookie.userId;
  const { productId, comment, rating } = req.body;

  const image = (await UserModel.findById(userId).select("image")) || null;
  const newComment = await CommentService.addComment({
    userId,
    productId,
    comment,
    rating,
    userImage: image,
  });
  res.status(201).json({ success: true, data: newComment });
};

const getCommentsByProductId = async (req, res) => {
  const { productId } = req.params;

  const comments = await CommentService.getCommentsByProductId(productId);
  res.status(200).json(comments);
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userCookie._id;
  const result = await CommentService.deleteComment(commentId, userId);
  if (result.deletedCount <= 0) {
    throw new AppError("Comment not found", 404, "COMMENT_NOT_FOUND");
  }
  return res.json({ success: true, data: "Comment not found or unauthorized" });
};
module.exports = { createComment, getCommentsByProductId, deleteComment };

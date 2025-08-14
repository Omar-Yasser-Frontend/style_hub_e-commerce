const { default: mongoose } = require("mongoose");
const { UserModel } = require("./auth");

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userImage: { type: String, default: null },
  },
  { timestamps: true }
);

commentSchema.index({ productId: 1 });

const CommentModel = mongoose.model("comment", commentSchema);

class CommentService {
  static async addComment(commentData) {
    const comment = new CommentModel(commentData);
    return await comment.save();
  }

  static async getCommentsByProductId(productId) {
    const comments = await CommentModel.find({ productId })
      .sort({
        createdAt: -1,
      })
      .lean();

    const users = await UserModel.find({
      _id: { $in: comments.map((c) => c.userId) },
    })
      .select({
        image: 1,
        name: 1,
      })
      .lean();

    const userMap = new Map(users.map((user) => [user._id.toString(), user]));

    comments.forEach((comment) => {
      const user = userMap.get(comment.userId);
      if (user) {
        comment.userName = user.name || "user";
        comment.userImage = user.image || null;
      }
    });

    return comments;
  }

  static async deleteComment(commentId, userId) {
    return await CommentModel.deleteOne({ _id: commentId, userId });
  }
}



module.exports = { CommentModel, CommentService };

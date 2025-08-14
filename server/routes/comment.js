const express = require("express");
const userToken = require("../middlewares/userToken");
const {
  createComment,
  getCommentsByProductId,
  deleteComment,
} = require("../controllers/comment");
const { validateComment } = require("../middlewares/commentValidation");

const router = express.Router();

router.get("/:productId", getCommentsByProductId);

router.use(userToken);

router.post("/", validateComment, createComment);

router.delete("/:commentId", deleteComment);

module.exports = router;

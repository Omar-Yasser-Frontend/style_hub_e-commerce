const { default: z } = require("zod");

const commentSchema = z.object({
  productId: z.string().length(24, "Invalid product ID format"),
  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
});

const validateComment = (req, res, next) => {
  const { error } = commentSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ message: error.errors[0].message });
  }
  next();
};

module.exports = { validateComment };

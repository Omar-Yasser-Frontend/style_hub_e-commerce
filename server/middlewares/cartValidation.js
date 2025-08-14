const { default: z } = require("zod");
const AppError = require("../utils/AppError");

async function addToCartValidation(req, res, next) {
  try {
    req.body.productId = req.body.id;
    const addToCartSchema = z
      .object({
        productId: z
          .number()
          .int()
          .positive("Product ID must be a positive integer"),
        price: z.number().positive("Price must be a positive number"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer")
          .default(1),
      })
      .strip();

    req.cartItem = await addToCartSchema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(", ");
      return next(new AppError(errorMessage, 400));
    }
    next(new AppError("Validation failed", 400));
  }
}

async function updateCartValidation(req, res, next) {
  try {
    const updateCartSchema = z
      .object({
        id: z.number().int().positive("Product ID must be a positive integer"),
        price: z.number().positive("Price must be a positive number"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
      })
      .strip();

    req.cartItem = await updateCartSchema.parseAsync(req.body);
    return next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(", ");
      return next(new AppError(errorMessage, 400));
    }
    return next(new AppError("Validation failed", 400));
  }
}

async function deleteCartValidation(req, res, next) {
  try {
    const deleteCartSchema = z.object({
      id: z.string().transform((val) => {
        const parsed = parseInt(val);
        if (isNaN(parsed) || parsed <= 0) {
          throw new Error("Product ID must be a positive integer");
        }
        return parsed;
      }),
    });

    req.params = await deleteCartSchema.parseAsync(req.params);
    return next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(", ");
      return next(new AppError(errorMessage, 400));
    }
    return next(new AppError("Invalid product ID", 400));
  }
}

module.exports = {
  addToCartValidation,
  updateCartValidation,
  deleteCartValidation,
};

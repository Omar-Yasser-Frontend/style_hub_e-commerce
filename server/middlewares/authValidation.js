const { default: z } = require("zod");
const { emailRegex, passwordRegex } = require("../constants");

async function loginValidation(req, res, next) {
  try {
    const userSchema = z
      .object({
        email: z.string().trim().min(1).max(100).email("Invalid email"),
        password: z.string().trim().max(75).regex(passwordRegex),
      })
      .strip();

    req.user = await userSchema.parseAsync(req.body);

    return next();
  } catch (err) {
    console.log(err.stack);
    res.status(400).send("Malformed Inputs");
  }
}

module.exports = {
  loginValidation,
};

async function singupValidation(req, res, next) {
  try {
    const signupSchema = z
      .object({
        name: z
          .string()
          .trim()
          .min(6, "name must be at least 6 characters")
          .max(50),
        email: z.string().trim().email("Invalid email").max(100),
        password: z
          .string()
          .trim()
          .max(75)
          .regex(passwordRegex, "weak password"),
      })
      .strip();

    console.log("finished parse");
    req.user = await signupSchema.parseAsync(req.body);

    next();
  } catch (err) {
    console.log(err.stack);
    res.status(400).send("Malformed Inputs");
  }
}

async function changePasswordValidation(req, res, next) {
  try {
    const changePswrd = z
      .object({
        currPassword: z
          .string()
          .min(8, "Password Should be at least 8 letters")
          .max(75, "Password is too long")
          .regex(
            passwordRegex,
            "Password Must Include at least 8 letters includes capital and small letter, numbers and special characters"
          ),
        password: z
          .string()
          .min(8, "Password Should be at least 8 letters")
          .max(75, "Password is too long")
          .regex(
            passwordRegex,
            "Password Must Include at least 8 letters includes capital and small letter, numbers and special characters,"
          ),
      })
      .strip();

    req.body = await changePswrd.parseAsync(req.body);

    return next();
  } catch (err) {
    console.log(err.stack);
    res.status(400).send("Malformed Inputs");
  }
}

async function confirmationValidation(req, res, next) {
  try {
    const confirmationSchema = z
      .object({
        code: z.string().trim().length(6, "Code must be 6 characters long"),
      })
      .strip();

    req.body = await confirmationSchema.parseAsync(req.body);

    return next();
  } catch (err) {
    console.log(err.stack);
    res.status(400).send("Malformed Inputs");
  }
}

module.exports = {
  loginValidation,
  singupValidation,
  changePasswordValidation,
  confirmationValidation,
};

const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function userToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token || token === "undefined") {
    if (req.path.startsWith("/check-auth")) {
      throw new AppError("user is not logged in", 403, "NOT_LOGGED_IN");
    }
    throw new AppError(
      "User is not authorized to perform this action",
      403,
      "NOT_AUTHORIZED"
    );
  }
  try {
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);

    req.userCookie = decodedJwt;
    next();
  } catch (err) {
    console.log(err);
    if (!token) {
      if (req.path.startsWith("/check-auth")) {
        throw new AppError("user is not logged in", 403, "NOT_LOGGED_IN");
      } else {
        throw new AppError(
          "User is not authorized to perform this action",
          403,
          "NOT_AUTHORIZED"
        );
      }
    }

    res.clearCookie("token");
    throw new AppError(
      "User is not authorized to perform this action",
      403,
      "INVALID_TOKEN"
    );
  }
}

module.exports = userToken;

const jwt = require("jsonwebtoken");

module.exports = function bearerToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).send("Authorization header is missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(403).send("Token is invalid");
  }
};

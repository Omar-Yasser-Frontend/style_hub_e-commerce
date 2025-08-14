const jwt = require("jsonwebtoken");

module.exports = ({ isActive, email, _id: userId }) => {
  const token = jwt.sign({ isActive, email, userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

module.exports = (user) => {
  user = user.toObject();

  delete user.password;
  delete user.code;

  return user;
};

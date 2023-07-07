const User = require("../users/users-model");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  const [user] = await User.goreBul({ username: username });
  if (!user) {
    res.status(401).json({ message: "Geçersiz kriter" });
  } else {
    req.user = user;
    next();
  }
};

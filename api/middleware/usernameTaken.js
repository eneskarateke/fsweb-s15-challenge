const User = require("../users/users-model");
const bcrypt = require("bcryptjs");
const { HASH_ROUND } = require("../secrets");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  const [user] = await User.goreBul({ username: username });
  if (user) {
    res.status(422).json({ message: "username alınmış" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, HASH_ROUND);
    req.hashedPassword = hashedPassword;
    next();
  }
};

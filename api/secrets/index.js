const HASH_ROUND = 8;
const JWT_SECRET = process.env.JWT_SECRET || "shh";
module.exports = {
  HASH_ROUND,
  JWT_SECRET,
};

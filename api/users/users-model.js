const db = require("../../data/dbConfig.js");

function bul() {
  return db("users");
}

function goreBul(filtre) {
  return db("users").where(filtre);
}

function idyeGoreBul(id) {
  return db("users").where("users.id", id).first();
}

async function ekle(payload) {
  const [id] = await db("users").insert(payload);
  const user = await idyeGoreBul(id);
  return user;
}

module.exports = {
  bul,
  goreBul,
  idyeGoreBul,
  ekle,
};

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const restrict = require("./middleware/restricted.js");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const bilmecelerRouter = require("./bilmeceler/bilmeceler-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.use("/api/bilmeceler", restrict, bilmecelerRouter); // sadece giriş yapan kullanıcılar erişebilir!

module.exports = server;

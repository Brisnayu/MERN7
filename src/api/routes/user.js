const express = require("express");
const { register, login } = require("../controller/user");

const usersRouters = express.Router();

usersRouters.post("/", register);
usersRouters.post("/login", login);

module.exports = usersRouters;

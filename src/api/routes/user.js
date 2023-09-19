const express = require("express");
const { register, login, getAllUsers, deleteUser } = require("../controller/user");

const usersRouters = express.Router();

usersRouters.get("/", getAllUsers);
usersRouters.post("/auth/register", register);
usersRouters.post("/auth/login", login);
usersRouters.delete("/:id", deleteUser);

module.exports = usersRouters;

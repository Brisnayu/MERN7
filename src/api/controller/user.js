const bcrypt = require("bcrypt");
const User = require("../models/user");
const { setError } = require("../../config/error");
const { generateSign } = require("../../config/jwt");

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);

    const userDuplicate = await User.findOne({ name: req.body.name });

    if (userDuplicate) {
      return next(setError(400, "This user already exist"));
    }

    const user = await newUser.save();

    return res.status(201).json({ data: user });
  } catch (error) {
    console.log("Error", error);
    return next(setError(400, "Error registering ❌"));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      console.log("Usuario no registrado ❌");
      return next(setError(400, "Something has gone wrong ❌"));
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ data: user, token });
    } else {
      console.log("Error, contraseña incorrecta");
      return next(setError(400, "Something has gone wrong ❌"));
    }
  } catch (error) {
    console.log("Error", error);
    return next(setError(400, "Failed to login ❌"));
  }
};

module.exports = { register, login };

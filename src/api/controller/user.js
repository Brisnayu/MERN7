const bcrypt = require("bcrypt");
const User = require("../models/user");
const { setError } = require("../../config/error");
const { generateSign } = require("../../config/jwt");
const { deleteFile } = require("../../middleware/deletefile");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().select({ password: false });
    return res.status(200).json({ data: allUsers });
  } catch (error) {
    return next(setError(400, "Can't see users 🥲"));
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const { email, password } = req.body;

    const emailDuplicate = await User.findOne({ email });

    if (emailDuplicate) {
      return next(setError(400, "This user already exist 🤔"));
    }

    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);

    if (password.length < 6) {
      return next(setError(400, "The password must be at least 6 characters 😥"));
    }

    if (upperCase === false) {
      return next(
        setError(400, "The password must have at least one uppercase letter 🥲"),
      );
    }

    if (lowerCase === false) {
      return next(
        setError(400, "The password must have at least one lowercase letter 🥹"),
      );
    }

    const user = await newUser.save();
    user.password = null;

    return res.status(201).json({ data: user });
  } catch (error) {
    console.log("Error", error.message);
    return next(setError(400, "Error registering ❌"));
  }
};

const login = async (req, res, next) => {
  try {
    const { user, password } = req.body;

    const userName = await User.findOne({ user });

    if (!userName) {
      console.log("Usuario no registrado ❌");
      return next(setError(400, "Something has gone wrong ❌"));
    }

    if (bcrypt.compareSync(password, userName.password)) {
      const token = generateSign(userName._id);
      userName.password = null;
      return res.status(200).json({ data: userName, token });
    } else {
      console.log("Error, contraseña incorrecta");
      return next(setError(400, "Something has gone wrong ❌"));
    }
  } catch (error) {
    console.log("Error", error);
    return next(setError(400, "Failed to login ❌"));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({ data: `Removed ${user.name}` });
  } catch (error) {
    return next(setError(400, "Error deleting user ❌"));
  }
};

const createAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldAvatar = await User.findById(id);
    const updateAvatar = req.body;

    if (req.file) {
      updateAvatar.avatar = req.file.path;
      if (oldAvatar.avatar) {
        deleteFile(oldAvatar.avatar);
      }
    }

    const createNewAvatar = await User.findByIdAndUpdate(id, updateAvatar, { new: true });
    return res.status(200).json({ data: createNewAvatar });
  } catch (error) {
    return next(setError(400, "Failed to login ❌"));
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  deleteUser,
  createAvatar,
};

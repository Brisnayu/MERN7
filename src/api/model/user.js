const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users", timestamps: true },
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
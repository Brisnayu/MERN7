const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: { type: [String], trim: true },
    year: { type: Number, required: true, trim: true },
    designer: { type: mongoose.Types.ObjectId, ref: "Designer" },
    category: { type: String, required: true, enum: ["Silla", "Taburete", "Mesa"] },
  },
  {
    collection: "designs",
    timestamps: true,
  },
);

const Design = mongoose.model("Design", designSchema, "designs");

module.exports = Design;

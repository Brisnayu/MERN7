const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // AQUÍ VA EL TIPO, si es una silla, taburete, etc...
    images: { type: [String], trim: true },
    year: { type: Number, required: true, trim: true },
    designer: { type: mongoose.Types.ObjectId, ref: "Designer" },
  },
  {
    collection: "designs",
    timestamps: true,
  },
);

const Design = mongoose.model("Design", designSchema, "designs");

module.exports = Design;

const mongoose = require("mongoose");

const designerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    Nationality: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    design: [{ type: mongoose.Types.ObjectId, ref: "Design" }],
  },
  {
    collection: "designers",
    timestamps: true,
  },
);

const Designer = mongoose.model("Designer", designerSchema, "designer");

module.exports = Designer;

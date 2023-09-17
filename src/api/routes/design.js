const express = require("express");

const {
  getAllDesigns,
  getDesignById,
  createNewDesign,
  updateDesign,
  deleteDesign,
} = require("../controller/design");

const designsRouters = express.Router();

designsRouters.get("/", getAllDesigns);
designsRouters.get("/:id", getDesignById);
designsRouters.post("/", createNewDesign);
designsRouters.put("/:id", updateDesign);
designsRouters.delete("/:id", deleteDesign);

module.exports = designsRouters;

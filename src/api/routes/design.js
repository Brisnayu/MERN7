const express = require("express");
const { isAuth } = require("../../middleware/auth");
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
designsRouters.post("/", [isAuth], createNewDesign);
designsRouters.put("/:id", [isAuth], updateDesign);
designsRouters.delete("/:id", [isAuth], deleteDesign);

module.exports = designsRouters;

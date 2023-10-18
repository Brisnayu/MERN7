const express = require("express");
const { isAuth } = require("../../middleware/auth");
const {
  getAllDesigns,
  getDesignById,
  createNewDesign,
  updateDesign,
  deleteDesign,
  updateImagesDesign,
} = require("../controller/design");
const upload = require("../../middleware/file");

const designsRouters = express.Router();

designsRouters.get("/", getAllDesigns);
designsRouters.get("/:id", getDesignById);
designsRouters.post("/", upload.array("images", 4), createNewDesign);
designsRouters.put("/:id", [isAuth], upload.array("images", 4), updateDesign);
designsRouters.put(
  "/images/:id",
  [isAuth],
  upload.array("images", 4),
  updateImagesDesign,
);
designsRouters.delete("/:id", [isAuth], deleteDesign);

module.exports = designsRouters;

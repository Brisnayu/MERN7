const express = require("express");
const {
  getAllDesigners,
  getDesignerById,
  createNewDesigner,
  updateDesigner,
  deleteDesigner,
} = require("../controller/designer");
const upload = require("../../middleware/file");

const designersRouters = express.Router();

designersRouters.get("/", getAllDesigners);
designersRouters.get("/:id", getDesignerById);
designersRouters.post("/", upload.single("image"), createNewDesigner);
designersRouters.put("/:id", upload.single("image"), updateDesigner);
designersRouters.delete("/:id", deleteDesigner);

module.exports = designersRouters;

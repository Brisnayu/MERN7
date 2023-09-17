const express = require("express");
const {
  getAllDesigners,
  getDesignerById,
  createNewDesigner,
  updateDesigner,
  deleteDesigner,
} = require("../controller/designer");

const designersRouters = express.Router();

designersRouters.get("/", getAllDesigners);
designersRouters.get("/:id", getDesignerById);
designersRouters.post("/", createNewDesigner);
designersRouters.put("/:id", updateDesigner);
designersRouters.delete("/:id", deleteDesigner);

module.exports = designersRouters;

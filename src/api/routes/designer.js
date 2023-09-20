const express = require("express");
const {
  getAllDesigners,
  getDesignerById,
  createNewDesigner,
  updateDesigner,
  deleteDesigner,
} = require("../controller/designer");
const upload = require("../../middleware/file");
const { isAuth } = require("../../middleware/auth");

const designersRouters = express.Router();

designersRouters.get("/", getAllDesigners);
designersRouters.get("/:id", getDesignerById);
designersRouters.post("/", [isAuth], upload.single("image"), createNewDesigner);
designersRouters.put("/:id", [isAuth], upload.single("image"), updateDesigner);
designersRouters.delete("/:id", [isAuth], deleteDesigner);

module.exports = designersRouters;

const express = require("express");
const Design = require("../model/design");

const designsRouters = express.Router();

designsRouters.get("/", async (req, res) => {
  const designs = await Design.findById();
  res.status(200).json({ data: designs });
});

module.exports = designsRouters;

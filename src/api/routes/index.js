const express = require("express");
const designsRouters = require("./design");

const router = express.Router();

router.use("/design", designsRouters);

module.exports = router;

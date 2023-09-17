const express = require("express");
const designsRouters = require("./design");
const designersRouters = require("./designer");
const usersRouters = require("./user");

const router = express.Router();

router.use("/design", designsRouters);
router.use("/designer", designersRouters);
router.use("/user", usersRouters);

module.exports = router;

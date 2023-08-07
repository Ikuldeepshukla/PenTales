const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const postRoute = require("./user.route");

router.use(userRoute);
router.use(postRoute);

module.exports = router;

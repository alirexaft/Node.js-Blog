var express = require('express');
var router = express.Router();
const {checkLimitForComment, checkLimitForPost} = require("../middlewares/checkLimits");
const {verifyToken} = require("../middlewares/verifyToken");
const {register, login} = require("../moduls/user/userControllers")
router.get('/', verifyToken, checkLimitForComment, checkLimitForPost, async function(req, res) {
  res.status(201).json({
    "url": "mi9m"
  });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;

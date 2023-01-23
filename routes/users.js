var express = require('express');
var router = express.Router();
const User = require("../moduls/user/model");
const {register, login} = require("../moduls/user/userControllers")
router.get('/', async function(req, res, next) {
  const users = await User.find({});
  res.status(201).json(users);
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;

var express = require('express');
var router = express.Router();
const checkRole = require("../middlewares/checkRole");
const {UserListPanel} = require("../moduls/admin/controller")
const {verifyToken} = require("../middlewares/verifyToken");

// router.post("/create", verifyToken, checkLimitForPost, createPost);
router.get("/user-list", verifyToken, checkRole, UserListPanel);

module.exports = router;

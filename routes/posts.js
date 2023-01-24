var express = require('express');
var router = express.Router();
const {createPost, createComment} = require("../moduls/post/postController")
const {verifyToken} = require("../middlewares/verifyToken");
const {checkLimitForComment,
    checkLimitForPost} = require("../middlewares/checkLimits");

router.post("/create", verifyToken, checkLimitForPost, createPost);
router.post("/create-comment", verifyToken, checkLimitForComment, createComment);


module.exports = router;

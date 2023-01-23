var express = require('express');
var router = express.Router();
const {createPost} = require("../moduls/post/postController")
const {verifyToken} = require("../middlewares/verifyToken");

router.post("/create-post", verifyToken, createPost);

module.exports = router;

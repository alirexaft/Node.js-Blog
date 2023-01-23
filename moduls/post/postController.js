const User = require("../user/model");
const Post = require("./model");


async function createPost(req, res){

    const {title, body} = req.body;

    if (!(title)){
        res.status(422).send({
            "message": "عنوان پست لازم است",
            "status": 422,
            "success": false
        })
    }

    if (!(body)){
        res.status(422).send({
            "message": "متن پست لازم است",
            "status": 422,
            "success": false
        })
    }

    const post = await Post.create({
        author: req.user.userId,
        title: title,
        body: body
    });

    res.status(201).send({
        "message": "پست با موفقیت ایجاد شد",
        "status": 201,
        "success": true,
        "data": {
            "postId": post.id,
            "title": post.title
        }
    });
}

module.exports = {
    createPost
}
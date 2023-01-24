const Post = require("./model");
const Comment = require("../post/commentModel");

async function createPost(req, res){

    const {title, body} = req.body;

    if (!(title)){
        return res.status(422).json({
            "message": "عنوان پست لازم است",
            "status": 422,
            "success": false
        })
    }

    if (!(body)){
        return res.status(422).json({
            "message": "متن پست لازم است",
            "status": 422,
            "success": false
        })
    }

    const post = await Post.create({
        author: req.user.id,
        title: title,
        body: body,
        status: req.user.role === "Admin" || req.user.role === "Writer"? "confirmed": "pending"
    });

    return await res.status(201).json({
        "message": "پست با موفقیت ایجاد شد",
        "status": 201,
        "success": true,
        "data": {
            "postId": post.id,
            "title": post.title
        }
    });
}

async function createComment(req, res){
    const {text} = req.body;
    if (!(text)){
        return res.status(422).json({
            "message": "متن کامنت لازم است",
            "status": 422,
            "success": false
        })
    }

    const postId = await req.query.postId;

    if (postId === undefined ||!(postId)){
        return res.status(422).json({
            "message": "آیدی مورد پست مورد نظر لازم است",
            "status": 422,
            "success": false
        })
    }
    let post;
    try{
        post = await Post.findById(postId);
    }

    catch{
        return res.status(404).json({
            "message": "پست با این شناسه یافت نشد",
            "status": 404,
            "success": false
        })
    }

    const comment = await Comment.create({
        text: text,
        writer: req.user.id,
        status: req.user.role === "Admin" || req.user.role === "Writer"? "confirmed": "pending"
    })

    await post.comments.push(comment.id);
    await post.save();

    return await res.status(201).json({
        "message": "کامنت با موفقیت ایجاد شد",
        "status": 201,
        "success": true,
        "data": {
            "id": comment.id
        }
    })
}

module.exports = {
    createPost,
    createComment
}
async function checkLimitForComment(req, res, next){
    const user = await req.user;
    if (user.actionLimits && user.actionLimits == "create-comments"){
        return res.status(403).json({
            "message": "اجازه گذاشتن کامنت را ندارید",
            "status": 403,
            "success": false
        })
    }
    return await next();
}


async function checkLimitForPost(req, res, next){
    const user = await req.user;
    if (user.actionLimits && user.actionLimits == "create-post"){
        return res.status(403).json({
            "message": "اجازه گذاشتن پست را ندارید",
            "status": 403,
            "success": false
        })
    }
    return await next();
}

module.exports = {
    checkLimitForComment,
    checkLimitForPost,
}
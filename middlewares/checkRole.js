async function checkRole(req, res, next){

    if (await req.user.role !== "Admin"){
        return await res.status(403).json({
            "message": "اجازه دسترسی ندارید",
            "status": 403,
            "success": false
        })
    }

    return await next();

};

module.exports = checkRole;
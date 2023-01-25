const User = require("../user/model");

async function UserListPanel(req, res){
    const users = await User.find().select('_id first_name last_name username');
    
    return res.status(200).json({
        "message": "اطلاعات با موفقیت یافت شد",
        "status": 200,
        "success": true,
        "data": users
    })
}

module.exports = {
    UserListPanel
}
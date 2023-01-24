const jwt = require("jsonwebtoken");
const User = require("../moduls/user/model");

const verifyToken = async (req, res, next) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = await req.header("Authorization");
        
        const verified = await jwt.verify(token, jwtSecretKey);
        
        if(verified){
          const user = await User.findById(verified.userId);
          if(!(user)){
            return res.status(401).json({
              "message": "اطلاعات ورودی معتبر نیست لطفا دوباره سیستم شوید",
              "status": 401,
              "success": false,
              "data": {
                id: verified.userId
              }
            });
          }
            req.user = await user;
            return next();
        }else{
            // Access Denied
            return res.status(401).json({
              "message": "اطلاعات ورودی معتبر نیست لطفا دوباره وارد سیستم شوید",
              "status": 401,
              "success": false
            });
        }
    } catch (error) {
        // Access Denied
        return res.status(401).json({
          "message": "اطلاعات ورودی معتبر نیست لطفا دوباره وارد سیستم شوید",
          "status": 401,
          "success": false
        });
    }
};

module.exports = {
  verifyToken,
}
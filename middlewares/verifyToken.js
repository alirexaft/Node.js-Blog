const jwt = require("jsonwebtoken");


const verifyToken = async (req, res, next) => {
  // let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = await req.header("Authorization");
        
        const verified = await jwt.verify(token, jwtSecretKey);
        
        if(verified){
            req.user = verified;
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
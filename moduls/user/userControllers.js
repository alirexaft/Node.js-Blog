const bcrypt = require("bcrypt");
const User = require("../user/model");
const jwt = require("jsonwebtoken");


async function register(req, res){
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email)) {
          res.status(422).send({
            "message": "داده های ورودی معتبر نیست",
            "status": 422,
            "errors": "ایمیل الزامی است"
          });
        }

        if (!(password)) {
          res.status(422).send({
            "message": "داده های ورودی معتبر نیست",
            "status": 422,
            "errors": "رمز الزامی است"
          });
        }

        if (!(first_name)) {
          res.status(422).send({
            "message": "داده های ورودی معتبر نیست",
            "status": 422,
            "errors": "نام الزامی است"
          });
        }

        if (!(last_name)) {
          res.status(422).send({
            "message": "داده های ورودی معتبر نیست",
            "status": 422,
            "errors": "نام خانوادگی الزامی است"
          });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send({
            "message": "لطفا نام کاربری دیگری انتخاب کنید",
            "status": 409,
            "success": false
          });
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          role: "User"
        });

        // const token = jwt.sign(
        //   { user_id: user._id, email },
        //   process.env.TOKEN_KEY,
        //   {
        //     expiresIn: "2h",
        //   }
        // );
        

        // bigfish
        let data = {
          time: Date(),
          userId: user.id,
      }

        const token = await jwt.sign(data, process.env.JWT_SECRET_KEY);
    
        user.token = token;
        
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

async function login(req, res){
    const {email, password} = req.body;

    if (!(email)){
        res.status(422).send({
            "message": "داده های ورودی معتبر نیست",
            "status": 422,
            "errors": "ایمیل الزامی است"
          });
    }

    if (!(password)){
        res.status(422).send({
            "message": "داده های ورودی معتبر نیست",
            "status": 422,
            "errors": "رمز الزامی است"
          });
    }

    const user = await User.findOne({email: email});

    if (user, await bcrypt.compare(password, user.password)){
        let data = {
            time: Date(),
            userId: user.id,
        }
      
          const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: "2h"});
          user.token = token;

          await res.status(200).json({
            message: "با موفقیت وارد شدید",
            status: 200,
            success: true,
            data : {
                userId: user.id,
                token: token 
            }
          })
    }

    else{
        res.status(404).json({
            message: "کاربر یافت نشد",
            status: 404,
            success: false
        })
    }

}

module.exports = {
    register,
    login,
}
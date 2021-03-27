const User = require('../models/user')
const JWT = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signup = async (req,res) => {
    const { firstName, lastName, userName, email, password } = req.body
    try {
       const user = await new User({
           firstName,
           lastName,
           userName,
           email,
           password
       }) 
        const userExist = await User.findOne({email:email})
        // user.role = undefined
        if(userExist){
            return res.status(400).json({
                message:'user already signed up'
            })
        }
       const users = await user.save()
       res.status(200).json(users)
  
    } catch (error) {
        res.status(500).json({
            error:'server error'
        } )
           
          
        
    }  
}


//signin route
exports.signin = async (req,res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email:email})
        //  user.role = undefined
         if(user){
           if(user.authenticate(password)){
            const token = JWT.sign({ _id: user._id }, process.env.JWT_TOKEN);
            res.cookie("token", token, { expire: new Date() + process.env.JWT_EXPIRES_IN });
            const {_id,firstName,lastName,email, role, fullName } = user;
             res.json({ 
               
               token, 
               user: { _id,firstName,lastName, email, role, fullName } });
            } 
            
         }
        
         else{
            return res.status(401).json({
              error: 'email and password is not exist,please register'
             })
           }
        } catch (error) {
         res.status(500).json({
           error:'server error to login'
         })
        }
}


//signout route
exports.signout = async (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'you are Signed out success'
    });
};



exports.requireSignIn = expressJwt({
    secret: process.env.JWT_TOKEN, // req.user
    algorithms: ["HS256"]
});

exports.auth = async(req,res,next) =>{
    const authUserId = req.user._id
    try {
        const user = await User.findById({_id:authUserId})
        if(!user){
            return res.status(400).json({
                error:'user not found'
            })
        }
        req.profile = user
        next()
    } catch (error) {
        res.status(500).json({
            error:"server error, user not found"
        })
    }
}

exports.admin = async(req,res, next) => {
    const adminUserId = req.user._id
    try {
        const user = await User.findById({ _id: adminUserId})
        if (!user) {
            return res.status(400).json({
                error: 'admin User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    } catch (error) {
        res.status(500).json({
            error:"server error, admin user not found"
        })
    }
}
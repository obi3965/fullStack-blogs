const User = require('../models/user')
const JWT = require('jsonwebtoken')



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
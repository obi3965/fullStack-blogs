const User = require('../models/user')

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
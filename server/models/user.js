const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:30
    },
    lastName:{
      type:String,
      require:true,
      trim:true,
      min:3,
      max:30
    },
    userName:{
      type:String,
      require:true,
      trim:true,
      unique:true,
      index:true,
      lowercase:true
    },
    email:{
      type:String,
      require:true,
      trim:true,
      unique:true,
      lowercase:true
    },
   
    hash_password:{
        type:String,
        required:true,
        minlength:8
    },
    role:{
      type:Number,
      default:0
  },
  photo: {
    data: Buffer,
    contentType: String
},
}, { timestamps:true})


userSchema.virtual('password')
.set(function(password){
 this.hash_password = bcrypt.hashSync(password, 10)
})


//create a virtual for our fullname
userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema)
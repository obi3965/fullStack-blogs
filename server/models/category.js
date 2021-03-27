const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique: true  
    },
    
    photo:{
        data: Buffer,
        contentType:String
    },
    desc: {
        type: String,
       
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }
    
    
}, {
    timestamps: true,
  }
)


module.exports = mongoose.model('Category' ,categorySchema)
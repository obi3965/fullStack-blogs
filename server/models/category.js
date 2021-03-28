const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        trim: true,
         
    },
    
    photo:{
        data: Buffer,
        contentType:String
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
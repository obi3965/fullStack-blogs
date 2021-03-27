const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const blogSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true,
        
        
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    
    photo: { 
        data: Buffer,
        contentType:String 
    },
    desc: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true,
    },
    text:{
        type:String,
        text:true,
        required:true
    },
   
      postedBy:{
      type:ObjectId,
      ref:'User'
      },
      categories: [{ type: ObjectId, ref: 'Category', required: true }],

    //   likeCount: [{
    //     type: Number,
    //     default: 0,
    // }],
    // comments: [
    //     {
    //         text: String,
    //         createdAt: { type: Date, default: Date.now },
    //         postedBy: { type: ObjectId, ref: 'User' }
    //     }
    // ],
    viewed: {
        type: Number,
        default: 0
    },
    fViewed: {
        type: Number,
        default: 1
    },
    category: {
        type:ObjectId,
        ref:'Category',
        required:true
      },
     
    
 
},{ timestamps: true})


module.exports = mongoose.model('blog' ,blogSchema)
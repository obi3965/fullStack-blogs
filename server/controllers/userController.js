const User = require('../models/user');
const Blog = require('../models/blog');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorandler');


exports.read = async(req,res) =>{
    req.profile.hashed_password = undefined;
    return res.json(req.profile)
}

exports.publicProfile = async(req,res) => {
     let userName = req.params.username
     let user;
     let blogs
     try { 
         
        const userFormDB = await User.findOne({userName})
        if(!userFormDB){
            return res.status(400).json({
                error: 'public User not found'
            });
        } 
          
        user = userFormDB
        let userId = user._id;
        const data = await Blog.find({postedBy: userId})
            .populate('categories', '_id name slug')
            // .populate('tags', '_id name slug')
            .populate('postedBy', '_id name')
            .limit(10)
            .select('_id title slug text desc categories postedBy createdAt updatedAt')

            if(!data){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
               user.photo = undefined;
                user.hashed_password = undefined;
                res.json({
                    user,
                    data:blogs
                });
     } catch (error) {
         res.status(500).json({
             error:'server error, not profile found in public'
         })
     }
    
}


exports.update = async(req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }

        let user = req.profile;
        user = _.extend(user, fields);

        if (fields.password && fields.password.length < 6) {
            return res.status(400).json({
                error: 'Password should be min 6 characters long'
            });
        }

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        try {
            let result = await user.save();
            result.photo = undefined;
            user.hashed_password = undefined;
            res.json({
              message:'category is updated',
              result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
}


exports.photo = async(req,res) => {
    const userName = req.params.username 
    try {
       const user = await User.findOne({ userName })
       if (!user) {
        return res.status(400).json({
            error: 'User not found'
        });
    } 
    if (user.photo.data) {
        res.set('Content-Type', user.photo.contentType);
        return res.send(user.photo.data);
    }
    } catch (error) {
        console.log(error);
            res.status(500).send('Server error, photo not found');
    }
}
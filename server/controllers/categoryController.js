const Category = require('../models/category')
const slugify = require('slugify')
const formidable = require('formidable');
const fs = require('fs')
const lodash = require('lodash')



exports.create = async(req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }

        if (!files.photo) {
            return res.status(400).json({
                error: 'Image is required',
            });
        }
        
        const { name, slug = slugify(name).toLowerCase() } = fields;
                
        let categorySaved = new Category(fields);
        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size',
            });
        }

        categorySaved.photo.data = fs.readFileSync(files.photo.path);
        categorySaved.photo.contentType = files.photo.type;
         categorySaved.photo.data = undefined
         categorySaved.photo.contentType = undefined
        try {
            await categorySaved.save();
            res.json({
              message:'Product Created Successfully',
              categorySaved
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
  
}



exports.list = async (req,res) => {

}

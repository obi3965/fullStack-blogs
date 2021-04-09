const Category = require("../models/category");
const Blog = require('../models/blog')
const slugify = require("slugify");
const formidable = require("formidable");
const fs = require("fs");
const lodash = require("lodash");
const { errorHandler } = require("../helpers/dbErrorandler");

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    if (!files.photo) {
      return res.status(400).json({
        error: "Image is required",
      });
    }

    const { name, slug = slugify(name).toLowerCase() } = fields;
    if(!name || !slug){
        return res.status(400).json({
            error: 'All fields are required',
        });
    }
    let categorySaved = new Category(fields);
    // 1MB = 1000000
    if (files.photo.size > 1000000) {
      return res.status(400).json({
        error: "Image should be less than 1MB in size",
      });
    }

    categorySaved.photo.data = fs.readFileSync(files.photo.path);
    categorySaved.photo.contentType = files.photo.type;
    // categorySaved.photo.data = undefined;
    // categorySaved.photo.contentType = undefined;
    try {
      await categorySaved.save();
      res.json({
        message: "Product Created Successfully",
        categorySaved,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  });
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({})
    
    if (!categories) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({error:"Server error"});
  }
};


exports.read = async(req,res) => {
    const slug  = req.params.slug.toLowerCase()
    try {
        const category = await Category.findOne({slug})
        if (!category) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        const data = await Blog.find({categories:category})
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name')
            .select('_id title slug text desc viewed categories postedBy createdAt updatedAt')
            if(!data) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json({ category: category, blogs: data });
    } catch (error) {
        res.status(500).json({
            error:'server error to find a single category'
        });
    }
}


exports.remove = async (req,res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const data = await Category.findOneAndRemove({ slug })
        if (!data) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(200).json({
            data:'category is deleted'
        })
    } catch (error) {
        res.status(500).json({
            error:'server error to find a single category'
        });
    }
}


exports.update = (req,res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOne({ slug:slug }).exec((err, oldBlog) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }

      let form = new formidable.IncomingForm();
      form.keepExtensions = true;

      form.parse(req, (err, fields, files) => {
          if (err) {
              return res.status(400).json({
                  error: 'Image could not upload'
              });
          }

          // let slugBeforeMerge = oldBlog.slug;
          oldBlog = lodash.extend(oldBlog, fields);
          // oldBlog.slug = slugBeforeMerge;

          const { name, slug = slugify(name).toLowerCase() } = fields;

          if (!name || !slug ) {
              res.json({
                message:'all fields is required'
              })
          }

          

          if (files.photo) {
              if (files.photo.size > 10000000) {
                  return res.status(400).json({
                      error: 'Image should be less then 1mb in size'
                  });
              }
              oldBlog.photo.data = fs.readFileSync(files.photo.path);
              oldBlog.photo.contentType = files.photo.type;
              
          }

          oldBlog.save((err, result) => {
              if (err) {
                  return res.status(400).json({
                      error: errorHandler(err)
                  });
              }
              // result.photo = undefined;
              res.json(result);
          });
      });
  });

}


exports.photo = async (req,res) => {
  const slug = req.params.slug
  try {
    const catPhoto = await Category.findOne({slug}).select('photo')
    if(!catPhoto){
      return res.status(400).json({
        error: errorHandler(err)
    });
    }
    res.set('Content-Type', catPhoto.photo.contentType);
            return res.send(catPhoto.photo.data);
  } catch (error) {
    res.status(500).json({
      error:'server error, photo not found'
    })
  }
}
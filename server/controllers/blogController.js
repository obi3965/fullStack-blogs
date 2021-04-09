const Blog = require('../models/blog')
const Category = require('../models/category')
const slugify = require('slugify')
const formidable = require('formidable')
const fs = require('fs')
const { errorHandler } = require('../helpers/dbErrorandler')


exports.create = async(req,res) => {
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
  
      const { title,desc,text, categories } = fields;

      if (!title || !title.length) {
        return res.status(400).json({
            error: 'title is required'
        });
    }

    if (!categories || categories.length === 0) {
        return res.status(400).json({
            error: 'At least one category is required'
        });
    }
      let blog = new Blog();
      blog.title = title;
      blog.desc = desc;
      blog.text = text;
      blog.slug = slugify(title);
      blog.postedBy = req.user._id;

      let arrayOfCategories = categories && categories.split(',');

      if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }
      try {
       const result = await blog.save();
       if (!result) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
     await Blog.findByIdAndUpdate(result._id, {$push: { categories: arrayOfCategories}}, { new: true})
      if(!result){
        return res.status(400).json({
            error: errorHandler(err)
        });
      }else {
        res.json(result);
    }

} catch (error) {
        console.log(error);
        res.status(500).send("Server error");
      }
    });
}



exports.list = async (req,res) =>{
  try {
    const listAll = await Blog.find({})
    .populate('categories', '_id name slug')
    .populate('postedBy', '_id name userName')
    .select('_id title slug desc text categories postedBy createdAt updatedAt')
    if(!listAll) {
      return res.json({
        error: errorHandler(err)
    });
    }
    res.status(200).json({
      listAll
    })
  } catch (error) {
    res.status(500).json({
      error:'server error,blogs are not found'
    })
  }
}


exports.read = async(req,res) => {
  const slug = req.params.slug
  try {
    const readBlog = await Blog.findOne({slug})
    .populate('categories', '_id name slug')
    .populate('postedBy', '_id name userName')
    .select('_id title slug desc text categories postedBy createdAt updatedAt')
    if(!readBlog) {
      return res.json({
        error: errorHandler(err)
    });
    }
    res.status(200).json({
      readBlog
    })
  } catch (error) {
    res.status(500).json({
      error:'server error,blog is not found'
    })
  }
}


exports.remove = (req,res) => {
  const slug = req.params.slug
    Blog.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Blog deleted successfully'
        });
    });
    
}

exports.all = async(req,res) => {
  // try {
  //   const all = await Blog.find({}).select('-photo')
  //   res.json(all)
  // } catch (error) {
  //   res.status(500).json({
  //     error:'server error'
  //   })
  // }
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  try {
    const blogs = await Blog.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        if(!blogs){
          return res.status(400).json({
            error: 'blogs not found'
        });
        }
        res.json(
             
            blogs 
          );
  } catch (error) {
    res.status(500).json({
          error:'server error'
        })
  }
}


exports.listRelated = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  const { slug, categories } = req.body;
  try {
  const blogs = await Blog.find({ slug: { $ne: slug }, categories: { $in: categories } })

  .limit(limit)
  .populate('postedBy', '_id name userName')
  .select('title slug text desc postedBy createdAt updatedAt')
  if(!blogs){
    return res.status(400).json({
        error: 'products not found'
    })
}
res.json({blogs:blogs})
  } catch (error) {
    res.status(500).json({
      error:'server error'
    })
  }

};


exports.photo = async(req,res) => {
  const slug = req.params.slug
  try {
    const blog = await Blog.findOne({slug}).select('photo')
    res.set('Content-Type', blog.photo.contentType);
    return res.send(blog.photo.data)
   
  } catch (error) {
    res.status(500).json({
      error:'server error'
    })
  }
}





exports.listSearch = (req, res) => {
  
  const { search } = req.query;
  if (search) {
      Blog.find(
          {
              $or: [{ title: { $regex: search, $options: 'i' } }, { body: { $regex: search, $options: 'i' } }]
          },
          (err, blogs) => {
              if (err) {
                  return res.status(400).json({
                      error: errorHandler(err)
                  });
              }
              res.json(blogs);
          }
      ).select('-photo -body');
  }
};
import React from 'react'
import  BlogImage from './BlogImage'
import {Link} from 'react-router-dom'
/**
* @author
* @function Card
**/

const BlogCard = ({blogCard}) => {
  return(
    <div>
      <div className="shadow">
                    <div className="feature">
                      <BlogImage blogImage={blogCard} url="blog" />
                    </div>
                    <div className="post-card">
                    <div className="feature-items">
                      <p>{blogCard.title}</p>
                      <div className="feature1"></div>
                      {/* <p>{moment(f.createdAt).fromNow()}</p> */}
                    </div>
                    <h2 className="feature-title">{blogCard.text}</h2>
                    <div className="feature-link">
                      <Link to="">
                        read more <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  </div>
    </div>
   )

 }

export default BlogCard
import React from 'react'
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom'
import '../styles/slider.css'
/**
* @author
* @function Banner
**/

const Banner = () => {
const slideImages = [
  '../images/n.jpg',
  '../images/blog1.jpg',
  '../images/f-1.jpg'
]
  return(
    <>
    
      <div className="each-slide">  
       <div className="banner-title">
           <h1> foods blogs </h1>
           <div className="desc">
             <p>take a healthy foods and be a happy person.</p>
           </div>
           <br/>
           <Link to="/">menu</Link>
        </div>
      </div>
    </>
  
   )

 }

export default Banner
import React,{ useState, useEffect} from 'react'
import {getCategories, getAllBlogs } from '../core/CoreApi'
import CatImage from './CatImage';
import { Link } from 'react-router-dom'
import Banner from './Banner';
import '../styles/category.css'
import Services from '../components/Services';
import MidBanner from '../components/MidBanner';
import BlogCard from './BlogCard';

/**
* @author
* @function Home
**/

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [feature, setFeature] = useState([]);


    const init = async() => {
       const data = await getCategories()
    //    console.log(data);
       if(data.error){
           setError(data.error)
       }else{
           setCategories(data)
          
       }
    }
  

    const loadBlogByFeatures = async() => {
       const featureData = await getAllBlogs('viewed')
       console.log(featureData);
       if(featureData.error){
           setError(featureData.error)
       }else{
           setFeature(featureData)
       }
    }
    

     useEffect(() => {
        init()
        loadBlogByFeatures(true);
     }, [])

     const catData = () => (
         <div className="container-fluid">
         <div className="cat-title">
                 <h1>menu categories</h1>
                 <div className="cat-underline"></div>
             </div>
         <div className="row d-flex justify-content-center align-items-center">
             
             {categories.map((c, i)=>(
              <div key={i} className="col- m-2">
                <div className="catBox"> 
                   <CatImage item={c} url="category" />
                   <Link className="catLink" to={`/category/${c.slug}`}>
                  {c.name} 
                </Link>
                </div>
                
             </div>   
             ))}
             
         </div>
         </div>
     )



  return(
      <>
      <div>
    <Banner/>
      </div>
      <div>
       <Services/>
      </div>
    <div className="container-fluid">
        {catData()}
    </div>

    <div>
        <MidBanner/>
    </div>
    
     
     <div className="container">
         <div className="feature-title">
             <h1>feature blogs</h1>
         </div>
         <div className="row">
         {feature.map((blogCard,i) => (
                <div key={i} className="col-lg-6">
                  <BlogCard blogCard={blogCard} />
                </div>
              ))}
             
         </div>
     </div>

    </>
   )

 }

export default Home
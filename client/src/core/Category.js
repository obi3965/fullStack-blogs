import React,{useState, useEffect} from 'react'
import { category } from './CoreApi'
/**
* @author
* @function Category
**/

const Category = (props) => {

    const [singleCategory, setSingleCategory] = useState([]);
    const [error, setError] = useState(false);

    const loadCategory = async (slug) => {
     const cat = await category(slug)
     console.log(cat);
     if(cat.error){
         setError(cat.error)
     }else{
         setSingleCategory(cat)
     }
    }


    useEffect(() => {
        const slug = props.match.params.slug
       loadCategory(slug)
    }, [props])

  return(
    <div>
      
      heee
    </div>
   )

 }

export default Category
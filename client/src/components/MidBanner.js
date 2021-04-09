import React from 'react'
import '../styles/midbanner.css'
import { Link } from 'react-router-dom'
/**
* @author
* @function MidBanner
**/

const MidBanner = (props) => {
  return(
    <div>
        <section className="midbanner">
            <div className="midbanner-items">
                <h1>Everyday Fresh</h1>
                <div className="midbanner-btn">
                   <Link to="/about">view all</Link> 
                </div>
            </div>
        </section>
    </div>
   )

 }

export default MidBanner
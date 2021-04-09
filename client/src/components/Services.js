import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/services.css'

const Services = () => {

  return(
    <section>
        <div className="container">
    <h2 className="section-title mb-2 h1">What we do</h2>
        <p className="text-center text-muted h5">Having and managing a correct marketing strategy is crucial in a fast moving market.</p>
        <div className="row mt-5">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div className="card">
              <div className="card-block block-1">
                <h3 className="card-title">Special discount</h3>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="" title="Read more" className="read-more">Read more<i className="fa fa-angle-double-right ml-2" /></Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div className="card">
              <div className="card-block block-2">
                <h3 className="card-title">foods services</h3>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="" title="Read more" className="read-more">Read more<i className="fa fa-angle-double-right ml-2" /></Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div className="card">
              <div className="card-block block-3">
                <h3 className="card-title">customers</h3>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="" title="Read more" className="read-more">Read more<i className="fa fa-angle-double-right ml-2" /></Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

   
   )

 }

export default Services
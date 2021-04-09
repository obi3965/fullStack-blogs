import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom'
// import { isAuthenticated, signout } from '../auth/adminApi'

import '../styles/nav.css'
/**
* @author
* @function Nav
**/

const Nav = ({history}) => {

  const [click, setClick] = useState(false);
//   const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return(
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
    <Link className="navbar-brand" onClick={closeMobileMenu} to="/">
        
       <img src="./images/food-logo.png" alt=""/>
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link"activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/">Home </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/about">about</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link " activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/signup">signup</Link>
           </li>

           <li className="nav-item">
          <Link className="nav-link " activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/signin">signin</Link>
           </li>
        {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
               <Link className="nav-link" activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/user/profile">profile</Link>
            )} */}

        {/* {!isAuthenticated() && (
          <>
           <li className="nav-item">
          <Link className="nav-link " activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/signup">signup</Link>
           </li>
          <li className="nav-item">
          <Link className="nav-link " activeClassName="is-active" onClick={closeMobileMenu} exact={true} to="/signin">signin</Link>
        </li>
          </>
        )} */}
        
       

        {/* {isAuthenticated() && (
            <li className='nav-item'>
              <NavLink className="btn btn-signout"
              to='/signout'
              onClick={()=> signout(() =>{
                history.push('/')
            })}
              > 
                 sign out
              </NavLink>
            </li>
            )} */}
      </ul>
      
    </div>
    </div>
  </nav>
    
   )

 }

export default withRouter(Nav)
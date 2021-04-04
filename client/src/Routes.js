import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
/**
* @author
* @function Routes
**/

const Routes = (props) => {
  return(
    <>
      <BrowserRouter>
        <Nav/>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
        </Switch>
      </BrowserRouter>  
    </>
   )

 }

export default Routes
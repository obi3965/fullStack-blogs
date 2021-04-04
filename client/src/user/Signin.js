import React, {useState} from 'react'
import { signin } from '../auth/AuthApi'
import Spinner from '../../node_modules/react-spinners-css/dist/Spinner/index';
import { Redirect } from 'react-router';
/**
* @author
* @function Signin
**/

const Signin = () => {
  
    const [values, setValues] = useState({
        email:'',
        password:'',
        loading:false,
        redirectRefer:false,
        error:''
    });

    const { email, password, loading, error, redirectRefer } = values

   
   const loginSubmit = async (event) => {
   event.preventDefault();
   setValues({ ...values, error: false, loading:true });
     const data = await signin({ email, password })   
        
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
              //use a callback function
              
                setValues({
                  ...values, 
                  redirectRefer:true
              });
             
            }
    } 


    const handleLoginFormInput = name => event => {
         
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    //we should redirect our user
     const redirectUser = () => {
         if(redirectRefer){
             return <Redirect to="/" />
         }
     }
  
    const SigninForm = () => (
        <form>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input onChange={handleLoginFormInput('email')} type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input onChange={handleLoginFormInput('password')} type="password" className="form-control" id="password" />
        </div>
        <button onClick={loginSubmit} type="submit" className="btn btn-primary">login</button>
      </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
      );
      
      const showLoading = () =>
              loading && (
                  <div className="alert alert-info">
                      <Spinner color="#ff782b" /> 
                     
                  </div>
              );
    

  return(
    <div className="container">
      <div className="row">
         <div className="col-lg-6 offset-md-2">
             {SigninForm()}
             {showError()}
             {showLoading()}
             {redirectUser()}
         </div>
     </div>
   
    </div>
   )


 }

export default Signin
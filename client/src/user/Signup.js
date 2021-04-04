import React, {useState} from 'react'
import { signup } from '../auth/AuthApi'
import { Link } from 'react-router-dom'
/**
* @author
* @function Signup
**/

const Signup = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName:'',
        userName:'',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const handleRegisterFormInput = name => event => {
        setValues({...values, error: false, [name] :event.target.value})
    }

    //we should destructure to get all the values from our inputs
    const {firstName,lastName,userName,email,password, error,success} = values

    const clickSubmit = async event =>{
        event.preventDefault();
        setValues({ ...values, error: false });
         const data = await signup({ firstName,lastName,userName, email, password })   
            //  .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                  
                    setValues({
                        ...values,
                        firstName:'',
                        lastName:'',
                        userName:'',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    });
                }
            // });
      }

      const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
      );
      
      const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
      );

    const SignupForm = () => (
        <form>
        <div className="form-group">
                <label className="text-muted">first Name</label>
                <input onChange={handleRegisterFormInput('firstName')} type="text" className="form-control"  />
            </div>

        <div className="form-group">
          <label htmlFor="lastname">last Name</label>
          <input onChange={handleRegisterFormInput('lastName')} type="text" name="lastName"  className="form-control"  id="lastname" />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">full Name</label>
          <input onChange={handleRegisterFormInput('userName')} type="text" name="userName"  className="form-control"  id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input onChange={handleRegisterFormInput('email')} type="email" name="email"  className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input onChange={handleRegisterFormInput('password')} type="password" name="password" className="form-control" id="password" />
        </div>
        <button type="submit" onClick={clickSubmit} className="btn btn-primary">Register</button>

        </form>
    ) 

  return(
    <div className="container">
     <div className="row">
         <div className="col-lg-6 offset-md-2">
             {SignupForm()}
             {showError()}
             {showSuccess()}
         </div>
     </div>
  
    </div>
   )

 }

export default Signup
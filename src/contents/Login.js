//Imports
import React, {useState} from 'react'
import axios from 'axios'
import './company.css';

// Login function
export default function Login() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  //Sets up the login function to log the user in, uses authentication to lock certain aspects of the website out
  const login = (e) =>  {
    e.preventDefault();
    console.log("Logging up")
    let data = {"name": values.name, "email": values.email, "password" : values.password}
    var requestURI = "http://127.0.0.1:8000/api/users"
    console.log(requestURI)
    axios.post(requestURI, data).then(response => {
      console.log("Setting JWT in storage")
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      console.log("JWT set up successfully")
      setTimeout(function(){
        window.location.reload();
     }, 3000);
    })
    .catch(err => {
      console.log(err)
    });
   
  }
  // Authentication for user
  const authUser = sessionStorage.getItem('auth')
    //If user is authenticated, change the text
  let loginDisplay = "Log in now" 
  if (authUser) {
    loginDisplay = "You're already logged in"
  }
  //HTML//
  return (
    
    <div id="signup">
    <h2>To Use our Quote Generator, Please Login Up</h2>
    
      <form>
        <br></br>
        <label>
          e-mail:
          <input type="text" name="email" onChange={handleChange('email')}/>
        </label>
        <br></br>
        <label>
          Password:
          <input type="text" name="password" onChange={handleChange('password')} />
        </label>
        <br></br>
        <input type="submit" value= {loginDisplay} onClick={login} />
      </form>
    </div>
  );
}
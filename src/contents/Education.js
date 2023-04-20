import React, {useState} from 'react'
import axios from 'axios'

export default function Signup() {
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

  const signup = (e) =>  {
    e.preventDefault();
    console.log("Signing up")
    let data = {"name": values.name, "email": values.email, "password" : values.password}
    var requestURI = "http://127.0.0.1:8000/api/users"
    console.log(requestURI)
    axios.post(requestURI, data).then(response => {
      console.log("Setting JWT in storage")
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      console.log("JWT set up successfully")
      setTimeout(function(){
        window.location.reload();
     }, 5000);
    })
    .catch(err => {
      console.log(err)
    });
   
  }
  
  const authUser = sessionStorage.getItem('auth')
    
  let loginDisplay = "Log in now" 
  if (authUser) {
    loginDisplay = "You're already logged in"
  }
  return (
    
    <div id="signup">
    <h2>To Use our Quote Generator, Please Login Up</h2>
    <h>Dont Have an Account? </h>
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
        <input type="submit" value= {loginDisplay} onClick={signup} />
      </form>
    </div>
  );
}

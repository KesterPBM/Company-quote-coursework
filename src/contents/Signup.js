//Imports
import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import './company.css';

//Signup function
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

  //Gets the signup and posts it to database
  const signup = (e) =>  {
    e.preventDefault();
    console.log("Signing up")
    let data = {"name": values.name, "email": values.email, "password" : values.password}
    var requestURI = "http://127.0.0.1:8000/api/users"
    console.log(requestURI)
    axios.post(requestURI, data)
    
  }
  

  // HTML
  return (
    
    <div id="signup">
    <h2>To Use our Quote Generator, Please Sign Up</h2>
    
      <form>
      <label>
          Name:
          <input type="text" name="name" onChange={handleChange('name')}/>
        </label>
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
        <input type="submit" value="Submit" onClick={signup} />

      </form>
    </div>
  );
}
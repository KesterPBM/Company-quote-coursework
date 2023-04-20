import React, { Component } from 'react';
import Navitem from './Navitem';

// “Navitem” is the sub-component.
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      'NavItemActive':''
    }
    

  };

  render() {
    const authUser = sessionStorage.getItem('auth')
    let loginDisplay = <a href={'/Login'}>Login</a>
    let loginPath = "/Login"
    if (authUser) {
      loginDisplay = <a href={'/Logoff'}>Logoff</a>
      loginPath = "/Logoff"
    }

    let signupDisplay = <a>Sign Up</a>

    if (authUser) {
      signupDisplay = <a></a>
    } 
      return (
          <nav>
          <ul>
          <Navitem item="Quote Generator" tolink="/"  activec={this.activeitem}></Navitem>
          <Navitem item= {signupDisplay} tolink="/Signup"  activec={this.activeitem}></Navitem>
          <Navitem item={loginDisplay} tolink={loginPath}  activec={this.activeitem}></Navitem>
          </ul>
          </nav>
          )
    
        
        };

    
    activeitem=(x)=>
    {
      if(this.state.NavItemActive.length>0)
      {
        document.getElementById(this.state.NavItemActive).classList.remove('active');
      }
      this.setState({'NavItemActive':x},()=>{
        document.getElementById(this.state.NavItemActive).classList.add('active');
      });
    };
}
export default Navbar

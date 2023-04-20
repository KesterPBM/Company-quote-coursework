import React from 'react';
import './App.css';
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Quote from './contents/Quote';
import Signup from './contents/Signup';
import Login from './contents/Login';
import Logoff from './contents/logoff';
import PrivateRoute from "./contents/privateroute.js"

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <Route exact path="/">
        <Quote />
      </Route>
      <Route exact path="/Signup">
        <Signup />
      </Route>
      <Route exact path="/Login">
        <Login />
      </Route>
      <Route exact path="/Logoff">
        <Logoff />
      </Route>
      </div>
    </Router>
  )
}
export default App;

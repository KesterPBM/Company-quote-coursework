import React from 'react';
import './App.css';
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './contents/Home';
import About from './contents/About';
import Education from './contents/Education';
import Skills from './contents/Skills';
import Contact from './contents/Contact';
import TestSpace from './contents/Testspace';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/education">
        <Education />
      </Route>
      <Route exact path="/skills">
        <Skills />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route exact path="/testspace">
        <TestSpace />
      </Route>
      </div>
    </Router>
  )
}
export default App;

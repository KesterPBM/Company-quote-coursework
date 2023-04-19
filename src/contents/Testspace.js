import React, { Component } from 'react';
//importing the picture as "profilepic".
//import profilepic from '../img/inspirobot.jpg';
import ReactTypingEffect from 'react-typing-effect';
import Social from '../components/Social';

class TestSpace extends Component {
  render() {
    return (
      //<img src={profilepic} className="profilepic"></img>
      <div className="condiv home">
        <ReactTypingEffect className="typingeffect" text={['My text goes here','And here’s another line of text…']} speed={100} eraseDelay={700}/>
        <Social />
      </div>
    )
  }
}
export default TestSpace

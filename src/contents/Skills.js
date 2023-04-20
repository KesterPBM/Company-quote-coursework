import React, { Component } from 'react'
//importing the picture as "profilepic".
import { Redirect } from 'react-router-dom';

import {useQuery} from 'react-query'
import axios from 'axios'


class Skills extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      'myskills':['JS','JSX']
    };
  }
  render() {
    return (
      
      <div className="condiv skills">
        
      <h1 className="subtopic">My Skills</h1>
      <button onClick={this.getItems}>
          Retrieve stored quotes
        </button>
      

      <ul>
      {this.state.myskills.map((value)=>{
        return <li>{value}</li>
      })}
      </ul>
      </div>
    )
  }

  getItems(e) {
    console.log("Getting items")
    e.preventDefault();
    var todos = "woop"
    var state = this.state;
    state.items = [];
    state.text = ''
    console.log(state.items)
    axios.get('http://127.0.0.1:8000/api/todolist').then((response) => {
      todos = response.data;
      console.log(todos)
      todos.forEach(element =>
        {
          const newItem = {
            text: element.todoText,
            id: Date.now()
          };
          state.items = state.items.concat(newItem);
          state.text = '';
        })
      console.log(state.items)
      this.setState(state)

      });
  }
}



export default Skills

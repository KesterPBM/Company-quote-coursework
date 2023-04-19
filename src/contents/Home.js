import React, { Component } from 'react';
//importing the picture as "profilepic".

import {useQuery} from 'react-query'
import axios from 'axios'
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {nworkers:0,eworkers:0,exworkers:0, items: [], electricty: false, text: ''};
    this.valChange = this.valChange.bind(this);
    this.valSubmit = this.valSubmit.bind(this);
    this.storeItems = this.storeItems.bind(this);
    this.getItems = this.getItems.bind(this);
    let nworkers1 = 0;
    this.nworkers = nworkers1;
    
 }

  render() {
    

    return (
    
    
    <div className="App-header">
      <h1>Company Quote Generatoe</h1>
      <TodoList items={this.state.items} />
      <form onSubmit={this.valSubmit}>
       <label htmlFor="new-todo">
        Enter the required hour amount
       </label>
       <input
         id="new-todo"
         onChange={this.valChange}
         value= {this.state.text}
        />
        <button onClick={this.addNworker}>
          Add Novice Worker 
        </button>
        
       
        <button onClick={this.addEworker}>
          Add Experienced Worker 
        </button>
        <button onClick={this.addExworker}>
          Add Expert Worker 
        </button>

        <input
         id="new-todo"
         onChange={this.valChange}
         value={this.state.text}
        />
       
        <button>
          Estimate Quote{this.state.items.length +1}
        </button>
        <button onClick={this.storeItems}>
          Save {this.state.items.length} quotes to database
        </button>
        <button onClick={this.getItems}>
          Retrieve stored quotes
        </button>
        <ul>
          <li>
            Number of Novice Workers : {this.state.nworkers}
          </li>
          <li>
            Number of Experienced Workers : {this.state.eworkers}
          </li>
          <li>
            Number of Expert Workers : {this.state.exworkers}
          </li>
        </ul>
        <h2>
          Non-Human Resources (Expected costs of Expenditure)
          
        </h2>
        <ul>
          <li>
            Eletricity : 
            <button onClick={this.addElectricty}>
          Add
        </button>
          </li>
          <li>
            Comfort :  
            <button onClick={this.getItems}>
          Add
        </button>
          </li>
          <li>
            Land Rent : 
            <button onClick={this.getItems}>
          Add
        </button>
          </li>
        </ul>
      </form>
      </div>
    );
  
  
  }

  valChange(e) {
    this.setState({text: e.target.value})
  }

  valSubmit(e) {
    e.preventDefault();
    if(!this.state.text.length){
      return;
    }
    if (typeof this.state.text == String)
    {
      return;
    }
    
    
    const calculation = {text: ((Number(this.state.text)) * (this.state.nworkers * 10)) + ((Number(this.state.text)) * (this.state.eworkers * 20)) + ((Number(this.state.text)) * (this.state.exworkers * 30))}
    const nworkers = this.state.nworkers;


    this.setState(state => ({
      items: state.items.concat(calculation),
      text: '',
      
    }));
  }
   
  
 

 addNworker = () => {
  
  this.setState({ nworkers: this.state.nworkers + 1 });
 }  
 addEworker = () => {
  
  this.setState({ eworkers: this.state.eworkers + 1 });
 }

 addExworker = () => {
  
  this.setState({ exworkers: this.state.exworkers + 1 });
 }

 addElectricty = () => {
  this.setState({ electicty: true });

 }

 storeQuote(e) {
  e.preventDefault();
  console.log("Storing Quote")
  var state = this.state;
  axios.delete("http://127.0.0.1:8000/api/todolist", { crossdomain: true }).then ((response) => {
  var requestURI = "http://127.0.0.1:8000/api/todolist?todoNumber=" + state.id + "&todoText=" + state.items
  console.log(requestURI)
  axios.post(requestURI)
})
 }
  storeItems(e) {
    e.preventDefault();
    console.log("Storing items")
    var state = this.state;
    console.log(state)
    // First, clear the old list in the database:
    axios.delete("http://127.0.0.1:8000/api/todolist", { crossdomain: true }).then ((response) => {
  var requestURI = "http://127.0.0.1:8000/api/todolist?todoNumber=" + state.
  console.log(requestURI)
  axios.post(requestURI)
})
  }
  deleteItems(e) {
    e.preventDefault();
    console.log("deleting items")
    var state = this.state;
    console.log(state)
    // First, clear the old list in the database:
    axios.delete("http://127.0.0.1:8000/api/todolist", { crossdomain: true }).then ((response) => {

    })
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

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default MyToDoList;


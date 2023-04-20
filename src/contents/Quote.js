//Imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './company.css';
import {useQuery} from 'react-query'
import axios from 'axios'

//Constructor
class Myquote extends React.Component {
  constructor(props) {
    super(props);
    //State contains necessary information for finding price
    this.state = {nworkers:0,eworkers:0,exworkers:0, quotes: [], electricty: 0, comfort: 0,landrent: 0, text: ''};
    this.valChange = this.valChange.bind(this);
    this.valSubmit = this.valSubmit.bind(this);
    this.storeQuotes = this.storeQuotes.bind(this);
    this.getQuotes = this.getQuotes.bind(this);
    this.deleteQuotes = this.deleteQuotes.bind(this);
    
 }
 // Wont render page unless logged in, secruity reasons
  render() {
    const authUser = sessionStorage.getItem('auth');
    if (!authUser) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Redirect to="/Login" />
        
    }
    //HTML
    return (
    
    
    <div className="App-header">
      <h1>Company Quote Generator</h1>
      
      <form onSubmit={this.valSubmit}>
       <label htmlFor="new-todo">
        Enter the required hour amount
       </label>
       <input
         id="new-todo"
         onChange={this.valChange}
         value= {this.state.text}
        />
        <br></br>
        <button onClick={this.addNworker}>
          Add Novice Worker 
        </button>
        <button onClick={this.addEworker}>
          Add Experienced Worker 
        </button>
        <button onClick={this.addExworker}>
          Add Expert Worker 
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
            <button onClick={this.addComfort}>
          Add
        </button>
          </li>
          <li>
            Land Rent : 
            <button onClick={this.addLandRent}>
          Add
        </button>
          </li>
        </ul>
        <div class = "container">
          <div class = "center">
          <button>
          Estimate Quote
        </button>
          </div>
        </div>
      <br></br>
      <div>The cost generated (in pounds) : </div>
        <TodoList quotes={this.state.quotes} />
        <br></br>
        <button onClick={this.storeQuotes}>
          Save quote to database
        </button>
        <button onClick={this.getQuotes}>
          Retrieve stored quotes
        </button>
        <button onClick={this.deleteQuotes}>
          Delete quotes from database
        </button>
        <br>
        </br>
        




      </form>
      </div>
    );
  
  
  }
  //Gets the text inputted
  valChange(e) {
    this.setState({text: e.target.value})
  }
  //Used to gather the necessary infomation selected to provide the calculation
  valSubmit(e) {
    e.preventDefault();
    if(!this.state.text.length){
      return;
    }
    if (typeof this.state.text == String)
    {
      return;
    }
    
    //Price calculation which uses a randomly generated fudge number using Math.Random()
    const calculation = {text: (Math.round((((Number(this.state.text)) * (this.state.nworkers * 10)) + ((Number(this.state.text)) * (this.state.eworkers * 20)) + ((Number(this.state.text)) * (this.state.exworkers * 30)))* (1 + Math.random()))+ (this.state.electricty * 60)+ (this.state.comfort * 300)+ (this.state.landrent * 0))}
    
    
    //Set the state to return the new price
    this.setState(state => ({
      quotes: state.quotes.concat(calculation),
      text: '',
      
      
    }));
  }
   
  
 
//Adds a novice worker
 addNworker = () => {
  
  this.setState({ nworkers: this.state.nworkers + 1 });
 }  
 // Adds an experienced worker
 addEworker = () => {
  
  this.setState({ eworkers: this.state.eworkers + 1 });
 }
//Adds an expert worker
 addExworker = () => {
  
  this.setState({ exworkers: this.state.exworkers + 1 });
 }

 //Adds electric bill
 addElectricty = () => {
  this.setState({ electricty: this.state.electricty + 1 });

 }
//Adds comfort costs, ie sofas or lounge areas
 addComfort = () => {
  this.setState({ comfort: this.state.comfort + 1 });

 }
 //Adds land rent if the land is needing to be rented
 addLandRent = () => {
  this.setState({ landrent: this.state.landrent + 1 });

 }
//Stores the current quotes submitted by the user
 storeQuotes(e) {
  e.preventDefault();
  console.log("Storing quotes")
  var state = this.state;
  console.log(state)
  // First, clear the old list in the database:
  axios.delete("http://127.0.0.1:8000/api/quote", { crossdomain: true }).then ((response) => {
    state.quotes.forEach( element =>
    {
      var requestURI = "http://127.0.0.1:8000/api/quote?quotesNumber=" + element.id + "&quotesText=" + element.text
      console.log(requestURI)
      axios.post(requestURI)
    })

  })
  }
  //Deletes all quotes within database
  deleteQuotes(e) {
    e.preventDefault();
    console.log("deleting quotes")
    var state = this.state;
    console.log(state)
    // First, clear the old list in the database:
    axios.delete("http://127.0.0.1:8000/api/quote", { crossdomain: true })
  }

  //Returns the quotes currently stored within the database
  getQuotes(e) {
    console.log("Getting quotes")
    e.preventDefault();
    var todos = "woop"
    var state = this.state;
    state.quotes = [];
    state.text = ''
    console.log(state.quotes)
    axios.get('http://127.0.0.1:8000/api/quote').then((response) => {
      todos = response.data;
      console.log(todos)
      todos.forEach(element =>
        {
          const newItem = {
            text: element.quotesText,
            id: Date.now()
          };
          state.quotes = state.quotes.concat(newItem);
          state.text = '';
        })
      console.log(state.quotes)
      this.setState(state)

      });
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.quotes.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default Myquote;


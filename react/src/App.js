import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      persons: []
    }
  }
  componentDidMount() {
    fetch('http://localhost/get-api'
    ,
    {
      method:'POST',
      headers:{
         'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        ID:'1000'
      })
    })
    .then((r)=>r.json()
    .then((data)=>{
      this.setState({ persons: data });
    }));
  }

  render() {
    let json = this.state.persons;
    let arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });
    return <ul>{arr.map(item => <Person key={item.id} id={item.id} first_name={item.first_name} last_name={item.last_name} dob={item.dob} phone_number={item.phone_number} />)}</ul>;
  }
}

class Person extends React.Component {
  render() {
    return <li>{this.props.id + " - " + this.props.first_name + " " + this.props.last_name + " - " + this.props.dob  + " - " +  this.props.phone_number}</li>;
  }
}
export default App;
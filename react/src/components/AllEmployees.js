import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';

class AllEmployees extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      persons: []
    }
  }
  componentDidMount() {
    fetch('http://localhost/api/Employees')
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
    return <Link to={{ pathname:'/SearchById' , state:{ id: this.props.id }}}><li>{this.props.id + " - " + this.props.first_name + " " + this.props.last_name + " - " + this.props.dob  + " - " +  this.props.phone_number}</li></Link>;
  }
}
export default AllEmployees;
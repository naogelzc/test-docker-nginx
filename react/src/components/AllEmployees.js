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
    return <ul>{arr.map(item => <Link to={{ pathname:'/SearchById' , state:{ id: item.id }}}><li>{item.id + " - " + item.first_name + " " + item.last_name + " - " + item.dob  + " - " +  item.phone_number}</li></Link>)}</ul>;
  }
}
export default AllEmployees;
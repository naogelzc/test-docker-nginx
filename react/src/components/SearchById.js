import React, {Component} from 'react'
 
 // default search value.
    let searchValue = "1";
 
 class App extends Component {
     constructor(props) {
        super(props)
        const value = this.props.location.state
        if(typeof value === 'undefined'){
            this.state = {user : null, inputValue : ""}
        }else{
            this.state = {
               inputValue : value.id,
               user : null
            }
            
        }
        this.handlePostJSON = this.handlePostJSON.bind(this)
 }
   componentDidMount(){
      if(searchValue==null)
         return null
      else
         document.getElementById("submit").click()
   }
     handlePostJSON() {
        let formData = new FormData();
        formData.append('ID',searchValue);
 
        fetch(
       'http://localhost/api/Employee',
         {method: 'POST', body: formData}
        )
         .then(res => res.json())
         .then(data => {
            this.setState({user: data[0]})
         })
         .catch(e => console.log('error:', e))
     }
 
     render() {
        return (
         <div>
             <SearchForm inputValue = {this.state.inputValue}/>
             <input id="submit" type="button" value="Submit" onClickCapture={this.handlePostJSON}/>
            {this.state.user && (
              <ul>
                <li>ID: {this.state.user.id}</li>
                <li>First Name: {this.state.user.first_name}</li>
                <li>Last Name: {this.state.user.last_name}</li>
                <li>Date of Birth: {this.state.user.dob}</li>
                <li>Phone number: {this.state.user.phone_number}</li>
              </ul>
            )}
         </div>
        )
     }
 }
 
     class SearchForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: this.props.inputValue};
            this.handleChange = this.handleChange.bind(this);
        }
     
        handleChange(event) {
           this.setState({value: event.target.value});
        }
        render() {
       searchValue=this.state.value;
            return  <input type="text" value={this.state.value} onChange={this.handleChange} />;
        }
 
 }
 export default App
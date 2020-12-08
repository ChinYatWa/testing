import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class update extends React.Component{
    constructor(props){
      super(props);

      var ListID = localStorage.getItem("ListID")
        var Helper = localStorage.getItem("user")
        this.state={
          ListID: ListID,
          From: null,
          To : null,
          From_To : null,
          Helper : Helper,
          submited : false
        }
     }
     
  
  
    handleSubmit = e => {
      e.preventDefault();
      var link = parseInt(this.state.ListID)
      var tmp = {Helper : this.state.Helper,total : ""}
      axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?ListID='+link)
      .then(response=> {
      console.log(response)
      Object.assign(tmp,response.data.Item)
      console.log("yes")
      
      })
      .catch(error =>{
      console.log("no")
      
      })
      
      axios.post('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/postlist',tmp).then(
        console.log(tmp),
        console.info('submited')
      );
      

      this.setState({submited : true});
  
    };
  
     
     render(){
      if(this.state.submited===true){
        return <Redirect to ={'/home'}></Redirect>
      } 
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Are you sure to get this request?</h2>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="createAccount">
                <button type="submit">Yes</button>
              </div>
            </form>
          </div>
        </div>
      );
        
    
  }
}
  
  
  export default update;
  

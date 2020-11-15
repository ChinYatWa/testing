import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

class showlist extends React.Component{
  constructor(props){
    super(props);
      this.state={
        Data: null,
        go : null
      }
     this.toggle = this.toggle.bind(this)
   }

   toggle(id){
    this.setState( state => ({
      clicked: id === state.clicked? null: id
    }));
   }


  
  handleSubmit = e => {
    e.preventDefault();

    axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?From_To=STKT')
    .then(response=> {
      console.log(response)
      this.setState({Data : response.data.Item})
    })
    .catch(error =>{
      console.log(error)
      this.setState({error : true})
    })

    console.log(this.state.Data);

    localStorage.setItem("Data", this.state.Data)
    this.setState({go : true})

  };

  
   
   render(){
     if(this.state.go === true){
       return(
         <Redirect to = {'./show'} />
       )
     }
      return(
       <div>
        <form onSubmit={this.handleSubmit} noValidate>
        <h2>Request List</h2>
        <button type="submit">show</button>
        </form>
        
       </div>
      );
    }

}

export default showlist;

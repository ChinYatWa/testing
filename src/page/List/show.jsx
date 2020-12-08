import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';



class show extends React.Component{
  constructor(props){
    super(props);

    
      this.state={
        data : []
      }
   }
   


  handleSubmit = e => {
    e.preventDefault();
  }

   render(){

    const tmp = JSON.parse(localStorage.getItem("data"))
    console.log(tmp)
    let out = tmp.map((data) => (
      
      <ul>
        <div>{data.Shop}</div>
        <div>{data.Time}</div>
        <div>{data.Tips}</div>
      </ul>  
    ))
      return(
        <div>{out}</div>
      )
    
      
  }}



export default show;

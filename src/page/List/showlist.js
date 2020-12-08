import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

function handleget(ID) {
  console.log(ID)
  localStorage.setItem("ListID", ID)  
};

class showlist extends React.Component{
  constructor(props){
    super(props);
      this.state={
        ListID: null,
        From: null,
        To : null,
        From_To : null,
        selected : false,
        total : null,
        data : [],
        submited : false
      }
   }
   


  handleSubmit = e => {
    e.preventDefault();
    if(this.state.selected===false){
    this.setState({From_To : this.state.From +"_"+ this.state.To})
    let tmp = new Array()
    console.log(typeof(tmp))

    for(var i=0;i<this.state.total;i++){
    axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?ListID='+i)
    .then(response=> {
    console.log(response)
    if(response.data.Item.From_To === this.state.From_To){
      tmp.push(response.data.Item)
    }
    })
    .catch(error =>{
    console.log(error)
    this.setState({error : true})
    })
    this.setState({data : tmp})
    this.setState({selected : true})
  }
  }
  else{
    console.log(this.state.ListID)
    this.setState({submited : true})
  }

  };

  handleChange = e => {
    e.preventDefault();
    axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?ListID=-1')
    .then(response=> {
      console.log(response);
      this.setState({total : response.data.Item.total});
    })
    .catch(error =>{
      console.log(error)
    })
    console.log(this.state.total)


    const { name, value } = e.target;
    this.setState({[name]: value }, () => console.log(this.state))
    
  };

   
   render(){
    if(this.state.submited===true){
      return <Redirect to ={'/update'}></Redirect>
    } 
    if(this.state.selected === false) {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Select the Shop Location and transcation location</h2>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="ID">
              <label htmlFor="From">From : {" "}
              <select 
              name = "From"
              value = {this.state.From} 
              noValidate
              onChange={this.handleChange}>
                  <option value = "ST">Sha Tin</option>
                  <option value = "KB">Kowloon Bay</option>
                  <option value = "SSP">Sham Shui Po</option>
                  <option value = "TW">Tai Wai</option>=
              </select>
              </label>
            </div>

            <div className="ID">
              <label htmlFor="To">To : {" "}
              <select 
              name = "To"
              value = {this.state.To} 
              noValidate
              onChange={this.handleChange
              }>
                  <option value = "ST">Sha Tin</option>
                  <option value = "KB">Kowloon Bay</option>
                  <option value = "SSP">Sham Shui Po</option>
                  <option value = "TW">Tai Wai</option>=
              </select>
              </label>
            </div>

            <div className="createAccount">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
            }
    else{
    var tmp = {}

    
    tmp = this.state.data
    console.log(this.state.submited)
    let out = tmp.map((data) => (
      <form onSubmit={this.handleSubmit} noValidate>
        <ul>
        <div>Posted by : {data.ID}</div>
        <div>Shop Name : {data.Shop}</div>
        <div>Tips : {data.Tips}</div>
        <div>Transcation time : {data.Tips}</div>
        <button type="submit" onClick={()=>{handleget(data.ListID)}}>Get this request</button>
        <div>-----------------------------------------------</div>
        </ul>
      </form>
        
    ))

    
    console.log(out)
      return(
        <div>{out}</div>
      )
    }
      
  }
}


export default showlist;

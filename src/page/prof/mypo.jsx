import React from 'react';
import { Redirect } from "react-router-dom";
import "./profile.css";

import axios from 'axios';

axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?ListID=-1')
.then(response=> {
    console.log(response);
    localStorage.setItem("total",response.data.Item.total) 
})
.catch(error =>{
    console.log(error)
})
let total = localStorage.getItem("total"); 
console.log(total)
var tmp = new Array()

const user = localStorage.getItem("user")   
for(var i=0;i<total;i++){    
axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?ListID='+i)
.then(response=> {
console.log(response)
if(response.data.Item.ID === user){
    tmp.push(response.data.Item)
    
}
})}

class mypo extends React.Component{
  constructor(props){
    super(props);
      this.state={
        data : tmp
      }
   }

   

render(){   

  var tmp = {}

  tmp = this.state.data

let out = this.state.data.map((data) => (
      <ul>
      <div>Posted by : {data.ID}</div>
      <div>Shop Name : {data.Shop}</div>
      <div>Tips : {data.Tips}</div>
      <div>Transcation time : {data.Time}</div>
      <div>-----------------------------------------------</div>
      </ul>
  ))
  console.log(tmp)

  return (
<div>  
<div class="sidebar">
  <a href="./mypo">My post</a>
  <a href="./mymis">My mission</a>
  <a href="#about">Change Password</a>
  <a href="#about">History</a>
</div>

<div class="content">{out}
</div>
</div>    
  );
};
}

export default mypo;
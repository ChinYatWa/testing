import React from 'react';
import { Redirect } from "react-router-dom";
import "./profile.css";

const profile = () => {
 const tmp = localStorage.getItem("user")   
  return (
<div>  
<div class="sidebar">
  <a href="./mypo">My post</a>
  <a href="./mymis">My mission</a>
  <a href="#about">Change Password</a>
  <a href="#about">History</a>
</div>

<div class="content">Hello   {tmp}
</div>
</div>    
  );
};

export default profile;
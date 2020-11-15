import React from 'react';
import { Redirect } from "react-router-dom";

const Logout = () => {
   localStorage.setItem("refresh","1"); 
   localStorage.removeItem("token");
  return (
    <Redirect to ={'/home'}></Redirect>
  );
};

export default Logout;
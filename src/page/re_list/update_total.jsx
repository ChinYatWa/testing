import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const update_total = () => {
    var tmp = localStorage.getItem("total")
    tmp = parseInt(tmp)
    console.log(typeof(tmp))
    var data = {
        ListID : "-1",
        From_To : "hihihi",
        Shop : "",
        Item : "",
        Time : "",
        ID : "",
        Tips : "",
        Helper : "",
        total : tmp
    }
    console.log(data.total)
    axios.post('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/po/postlist/',data);
    console.info('submited');
  return (
    <Redirect to ={'/home'}></Redirect>
  );
};

export default update_total;
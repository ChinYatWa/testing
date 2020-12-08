import React, { Component } from "react";
import "./bar.css";
import logo from "./logo192.png"


class Bar extends Component {

    constructor(props){
        super(props)

    }

    render(){
        const log = localStorage.getItem("token")
        if(log === "1"){
            return(
                <div class="topnav">
                    <a href="./">
                    <img className="photo" src={logo} alt="Logo" />
                    </a>
        
                <div class="topnav-right">
                    <a href="#">Refresh</a>
                    <a href="./profile">Profile</a>
                    <a className = "bt1" href="./logout">Logout</a>
                    <a >  </a>
                </div>
                </div>
                );
        }
    return (
    <div class="topnav">
    <a href="./">
    <img className="photo" src={logo} alt="Logo" />
    </a>
    <div class="topnav-right">
        <a href="./signup">Sign Up</a>
        <a className = "bt1" href="./login">Log In</a>
        <a >  </a>
    </div>
    </div>
  );
}
};

export default Bar;
import React, { Component } from "react";
import "./home.css";
import {Link} from "react-router-dom";

class Home extends Component {

    constructor(props){
        super(props)

        const refresh = localStorage.getItem("refresh")
        if(refresh === "1"){
            window.location.reload(false);
            localStorage.removeItem("refresh");
        }

        let done = false;
        const logged = localStorage.getItem("token");
        if(logged === "1")
          done = true;
        
          this.state = {
              done
          };

        console.log(logged)
    }

    render(){
        if(this.state.done === true){
            return(
                <header>
                <div class="welcome-text">
                    <h1>
                        Select Your Service
                    </h1>
                    <li>
                    <Link to={'/list'}>Post A Request</Link>
                    <Link to={'/showlist'}>Help A Request</Link>
                    <Link to={'/'}>Give Me Some Suggestions</Link>
                    </li>
                </div>
            </header>
            )
        }

        return(
            
            <header>
                <div class="welcome-text">
                    <h1>
                        We are NeigbourHood
                    </h1>
                    <Link to={'/signup'}>Get Started</Link>
                </div>
            </header>
        )
    }
  }
  
  export default Home;
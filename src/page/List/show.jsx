import React, { Component } from "react";
import { Redirect } from "react-router-dom";


class show extends React.Component{
    constructor(props){
      super(props);

      const projects = localStorage.getItem("Data")
        this.state={
          projects,
          clicked:false
        }
       this.toggle = this.toggle.bind(this)
     }
  
     toggle(id){
      this.setState( state => ({
        clicked: id === state.clicked? null: id
      }));
     }
     
     render(){
        return(
         <div>
          <h2>My Projects</h2>
          <div>
          {
            this.state.projects.map( (project, i) =>{
              return(
                <div key={i} style={{width:'40%'}}>
                  <div className="card">
                    {project.ID}
                    <hr/>
                    Description : {project.Item} <br/>
                    <button type="button" onClick={() => this.toggle(project.ID)}>
                    {this.state.clicked === project.ID ? 'up' : 'down'}
                    </button>
                  </div>
                </div>
              );
            })
           }
          </div>
         </div>
        );
      }
  }

  export default show;
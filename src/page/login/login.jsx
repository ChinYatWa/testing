import React, { Component } from "react";
import axios from 'axios';
import "./login.css";
import { Redirect , Link } from "react-router-dom";


const formValid = ({ formErrors }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);

    let login = false;
    const logged = localStorage.getItem("token");
    if(logged === "1")
      login = true;

    this.state = {
      data : null,
      login,
      ID : null,
      Password: null,
      pw : null,
      formErrors: {
        id: "",
        password: "",
      }
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.info('loggedin')
      this.setState({login : true})
    } else {
      console.error("Wrong Password");
    }
  };

  handleChange = e => {
    e.preventDefault();


    axios.get('https://0vdl2otb65.execute-api.us-east-1.amazonaws.com/dex/getuserinfo?ID='+this.state.ID)
    .then(response=> {
      console.log(response)
      this.setState({data : response.data.Item.Password})
    })
    .catch(error =>{
      console.log(error)
      this.setState({error : true})
    })


    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "ID":
        formErrors.id =
          value.length < 1 ? "Input your ID" : "";
        break;

      case "Password":
        formErrors.password = 
          value !== this.state.data ? "Wrong Password": "";
          break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
  };

  render() {
    const { formErrors } = this.state;
    if(this.state.login){
      localStorage.setItem("token" , "1");
      localStorage.setItem("refresh", "1");
      localStorage.setItem("user",this.state.ID);
      return <Redirect to ={'/home'}></Redirect>
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="ID">
              <label htmlFor="ID">ID</label>
              <input
                placeholder="ID"
                type="text"
                name="ID"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="Password">
              <label htmlFor="Password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="Password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit">Log In</button>
              <small>
                <Link to = {'/signup'}>
                Do not Have an Account?
                </Link>
                </small>
            </div>
          </form>
        </div>
      </div>
            
    );
  }
}

export default Login;
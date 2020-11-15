import React, { Component } from "react";
import axios from 'axios';
import "./signup.css";
import { Link ,  Redirect } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);




function password_validate(password) {
  var re = {
      'capital' : /[A-Z]/,
      'digit'   : /[0-9]/,
      'special' : /[!@#$%^&-]/
  };
  return re.capital .test(password) && 
         re.digit   .test(password) && 
         re.special .test(password) &&
         password.length > 8;
}

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Signup extends Component {
  constructor(props) {
    super(props);
    let done = false
    const logged = localStorage.getItem("token");
    if(logged === "1")
      done = true;
  
    
    this.state = {
      ID : null,
      FirstName: null,
      LastName: null,
      Email: null,
      Password: null,
      ConfirmPassword : null,
      done,
      formErrors: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: ""
      }
    };


  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      axios.post('https://0vdl2otb65.execute-api.us-east-1.amazonaws.com/dev/createac',this.state);
      console.info('submited');
      this.setState({done : true});
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "FirstName":
        formErrors.firstName =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;

      case "LastName":
        formErrors.lastName =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;

      case "Email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "Password":
        formErrors.password = password_validate(value)
          ? ""
          : "your password must contain at least eight characters including at least one uppercase and lowercase letter, digit and special character"
          break;

      case "ConfirmPassword":
        formErrors.confirmpassword = (value === this.state.Password)
          ? ""
          : "Not match";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
  };

  render() {
    const { formErrors } = this.state;

    if(this.state.done === true){
      return <Redirect to = {'/login'}></Redirect>
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Create Account</h2>
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
            <div className="FirstName">
              <label htmlFor="FirstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="FirstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="LastName">
              <label htmlFor="LastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="LastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="Email">
              <label htmlFor="Email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="Email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
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
            <div className="ConfirmPassword">
              <label htmlFor="ConfirmPassword">Confirm your password</label>
              <input
                className={formErrors.confirmpassword.length > 0 ? "error" : null}
                placeholder="Confirm your password"
                type="password"
                name="ConfirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmpassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmpassword}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>
              <Link to = {'/login'}>
                Already Have an Account?
              </Link>  
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;

import React, { Component } from "react";
import axios from 'axios';
import "./App.css";


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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmpassword : null,
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
      const user = {
        "ID" : this.state.id,
        "FirstName" : this.state.firstName,
        "LastName" : this.state.lastName,
        "Email": this.state.email,
        "Password": this.state.password
      };
      axios.post('https://0vdl2otb65.execute-api.us-east-1.amazonaws.com/dev/createac',{user});
      console.info('submited');
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;

      case "lastName":
        formErrors.lastName =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "password":
        formErrors.password = password_validate(value)
          ? ""
          : "your password must contain at least eight characters including at least one uppercase and lowercase letter, digit and special character"
          break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="id">
              <label htmlFor="id">ID</label>
              <input
                placeholder="id"
                type="text"
                name="id"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="confirmpassword">
              <label htmlFor="confirmpassword">Confirm your password</label>
              <input
                className={formErrors.confirmpassword.length > 0 ? "error" : null}
                placeholder="Confirm your password"
                type="confirmpassword"
                name="confirmpassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmpassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmpassword}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
import React, { Component } from "react";
import axios from 'axios';
import "./list.css";
import { Link ,  Redirect } from "react-router-dom";

import TimePicker from 'react-time-picker';



const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });


  return valid;
};

class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      From : null,
      To: null,
      ID: null,
      Shop: null,
      Item: null,
      Tips : null,
      Time : '',
      formErrors: {
        From : "",
        To: "",
        ID: "",
        Shop: "",
        Item: "",
        Tips : "",
        Time : "",
      }
    };


  }

  handleSubmit = e => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    
    var data = {
        From_To : this.state.From+"_"+this.state.To,
        Shop : this.state.Shop,
        Item : this.state.Item,
        Time : this.state.Time,
        ID : user,
        Tips : this.state.Tips
    }
    if (formValid(this.state)) {
        axios.post('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/po/postlist/',data);
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
        case "From":
        formErrors.From =
          value === null ? "Selection the shop location" : "";
        break;

        case "To":
        formErrors.To =
            value === null ? "Selection the transaction location" : "";
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
          <h2>Post A Request</h2>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="ID">
              <label htmlFor="From">From</label>
              <select>
                  <option value = "ST">Sha Tin</option>
                  <option value = "KB">Kowloon Bay</option>
                  <option value = "SSP">Sham Shui Po</option>
                  <option value = "TW">Tai Wai</option>=
              </select>
            </div>

            <div className="ID">
              <label htmlFor="To">To</label>
              <select>
                  <option value = "ST">Sha Tin</option>
                  <option value = "KB">Kowloon Bay</option>
                  <option value = "SSP">Sham Shui Po</option>
                  <option value = "TW">Tai Wai</option>=
              </select>
            </div>

            <div className="LastName">
              <label htmlFor="Shop">Shop Name</label>
              <input
                className={formErrors.Shop.length > 0 ? "error" : null}
                placeholder="Shop"
                type="text"
                name="Shop"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Shop.length > 0 && (
                <span className="errorMessage">{formErrors.Shop}</span>
              )}
            </div>

            <div className="Email">
              <label htmlFor="Item">Item</label>
              <input
                className="textarea"
                placeholder="Item"
                type="text"
                name="Item"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Item.length > 0 && (
                <span className="errorMessage">{formErrors.Item}</span>
              )}
            </div>

            <div className="LastName">
              <label htmlFor="Tips">Tips</label>
              <input
                className={formErrors.Tips.length > 0 ? "error" : null}
                placeholder="Tips"
                type="text"
                name="Tips"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Tips.length > 0 && (
                <span className="errorMessage">{formErrors.Tips}</span>
              )}
            </div>
            
            <div className="LastName">
              <label htmlFor="Time">Time (i.e. 16:30 input 1630)</label>
              <input
                className={formErrors.Time.length > 0 ? "error" : null}
                placeholder="Time"
                type="text"
                name="Time"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Time.length > 0 && (
                <span className="errorMessage">{formErrors.Time}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;


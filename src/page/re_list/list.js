import React, { Component } from "react";
import axios from 'axios';
import "./list.css";
import { Link ,  Redirect } from "react-router-dom";




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
      ListID : null,
      From : null,
      To: null,
      ID: null,
      Shop: null,
      Item: null,
      Tips : null,
      Time : '',
      total : null,
      setkey :null,
      Data: null,
      done : false,
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

    const tmp = this.state.total + ""


    console.log(tmp)
    
    var data = {
        ListID : tmp,
        From_To : this.state.From+"_"+this.state.To,
        Shop : this.state.Shop,
        Item : this.state.Item,
        Time : this.state.Time,
        ID : user,
        Tips : this.state.Tips,
        Helper : "",
        total : ""
    }

      
    if (formValid(this.state)) {
      axios.post('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/po/postlist/',data);
      console.info('submited');
      console.log(data)
      this.setState({done : true});
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
      
      
  };
  
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    

    axios.get('https://82icieeeoa.execute-api.us-east-1.amazonaws.com/ge/getlist?ListID=-1')
    .then(response=> {
      console.log(response);
      this.setState({total : response.data.Item.total});
    })
    .catch(error =>{
      console.log(error)
      this.setState({error : true})
    })

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
    if(this.state.done === true){
      const tmp = this.state.total + 1
      localStorage.setItem("total",tmp)
      return <Redirect to = {'/update_total'}></Redirect>
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Post A Request</h2>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="ID">
              <label htmlFor="From">From : {" "}
              <select 
              name = "From"
              value = {this.state.From} 
              noValidate
              onChange={this.handleChange}>
                  <option value = "ST">Sha Tin</option>
                  <option value = "KB">Kowloon Bay</option>
                  <option value = "SSP">Sham Shui Po</option>
                  <option value = "TW">Tai Wai</option>=
              </select>
              </label>
            </div>

            <div className="ID">
              <label htmlFor="To">To : {" "}
              <select 
              name = "To"
              value = {this.state.To} 
              noValidate
              onChange={this.handleChange
              }>
                  <option value = "ST">Sha Tin</option>
                  <option value = "KB">Kowloon Bay</option>
                  <option value = "SSP">Sham Shui Po</option>
                  <option value = "TW">Tai Wai</option>=
              </select>
              </label>
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


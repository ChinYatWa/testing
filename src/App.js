import React from "react";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Signup from "./page/signup/signup"
import home from "./page/home/home"
import login from "./page/login/login"
import Bar from "./component/bar"
import logout from "./page/logout/logout"
import list from "./page/re_list/list"
import showlist from "./page/List/showlist"
import show from "./page/List/show"

function App(){
  return(
    <Router>
      <Bar />
      <Switch>
        <Route exact path = "/" component = {home} />
        <Route exact path = "/signup" component = {Signup} />
        <Route exact path = "/login" component = {login} />
        <Route exact path = "/logout" component = {logout} />
        <Route exact path = "/list" component = {list} />
        <Route exact path = "/showlist" component = {showlist} />
        <Route exact path = "/show" component = {show} />
        <Redirect to = ""/>
      </Switch>
    </Router>
  );
}

export default App;
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
import update_total from "./page/re_list/update_total"
import update from "./page/List/Update"
import profile from "./page/prof/profile"
import mypo from "./page/prof/mypo"
import mymis from "./page/prof/mymis"

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
        <Route exact path = "/update_total" component = {update_total} />
        <Route exact path = "/update" component = {update} />
        <Route exact path = "/profile" component = {profile} />
        <Route exact path = "/mypo" component = {mypo} />
        <Route exact path = "/mymis" component = {mymis} />
        <Redirect to = ""/>
      </Switch>
    </Router>
  );
}

export default App;
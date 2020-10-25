import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute =(props)=>{
const admin = localStorage.getItem('user');
return admin ?(<Route path={props.path} exact={props.exact} component={props.component}></Route>):(
    <Redirect to="/adminlogin" />);
}
   




export default PrivateRoute;
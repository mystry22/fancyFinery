import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute =({component:Component,path,...rest})=>{
const admin = localStorage.getItem('admin');
return (<Route path={path} render={props => admin? <Component {...props}/>: <Redirect to="/adminlogin" />}/>);
}
   




export default PrivateRoute;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route} from 'react-router-dom';
import PrivateRoute from './components/admin/PrivateRoute';
import UserPrivateRoute from './components/UserPrivateRoute';
import Home from './components/Home';
import Product from './components/Product';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import AdminLogin from './components/admin/AdminLogin';
import AdminHome from './components/admin/AdminHome';
import AddProduct from './components/admin/AddProduct';
import EditProduct from './components/admin/EditProduct';
import EditSingleProduct from './components/admin/EditSingleProduct';
import AddCategory from './components/admin/AddCategory';
import Working from './components/admin/Working';
import Pending from './components/admin/Pending';
import Delivered from './components/admin/Delivered';
import Order from './components/admin/Allorder';
import Payment from './components/Payment';
import Delivery from './components/Delivery';
import Print from './components/admin/Print';
import Category from './components/Category';
import Contact from './components/Contact';
import Success from './components/Success';
import Variation from './components/Variation';
import AddVariation from './components/admin/AddVariation';
import Account from './components/Account';


function App() {

  return (
    <React.Fragment>
    <BrowserRouter>
    <Route path="/" exact component={Home}/>
    <Route path="/product/:id" exact component={Product}/>
    <Route path="/register" exact component={Register}/>
    <Route path="/login" exact component={Login}/>
    <Route path="/cart" exact component={Cart}/>
    <Route path="/payment/" exact component ={Payment}/>
    <Route path="/delivery/" exact component={Delivery}/>
    <Route path="/category/:id" exact component={Category}/>
    <Route path="/contact/" exact component={Contact}/>
    <Route path="/success/" exact component={Success}/>
    <Route path="/variation/:id" exact component={Variation}/>
    <Route path="/adminlogin" exact component={AdminLogin}/>

 

 
      <UserPrivateRoute path="/account" exact component={Account}/>
    
    <PrivateRoute path="/print" exact component={Print} />
    <PrivateRoute path="/adminhome" exact component={AdminHome}/>
    <PrivateRoute path="/addProduct" exact component={AddProduct}/>
    <PrivateRoute path="/editProduct" exact component={EditProduct}/>
    <PrivateRoute path="/editSingleProduct/:id" exact component={EditSingleProduct}/>
    <PrivateRoute path="/addVariation/:id" exact component={AddVariation}/>
    <PrivateRoute path="/working" exact component={Working}/>
    <PrivateRoute path="/pending" exact component ={Pending}/>
    <PrivateRoute path="/delivered" exact component = {Delivered}/>
    <PrivateRoute path="/order" exact component = {Order}/>
    <PrivateRoute path="/addCategory" exact component={AddCategory}/>
    </BrowserRouter>
    </React.Fragment>
  );

}

export default App;

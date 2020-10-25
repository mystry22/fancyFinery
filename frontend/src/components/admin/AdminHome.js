import React from 'react';
import AdminNavigator from './AdminNavigator';



export default class AdminHome extends React.Component{
    constructor(){
        super();
    }

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin Dashboard";
    }

    logOutAdmin = (e)=>{
        e.preventDefault();
        const url = '/adminlogin';
        localStorage.removeItem('admin');
        window.location = url;
    }



    render(){
        return(
            <React.Fragment>

            <AdminNavigator />
            <br/>
            <br/>
            <br/>
            <section id="adminBody" className="adminBody">

                <div className="container">

                
                
                <div className="row">

                    <div className="col-lg-3 col-sm-8">
                        <a href="/addProduct"><i className="fa fa-plus fa-5x"></i><h6>Add Product</h6></a>
                    </div>

                    <div className="col-lg-3 col-sm-8">
                        <a href="/addCategory"><i className="fa fa-folder fa-5x"></i><h6>Add Category</h6></a>
                    </div>

                    <div className="col-lg-3 col-sm-8">
                        <a href="/editProduct"><i className="fa fa-pencil-square-o fa-5x"></i><h6>Edit Product</h6></a>
      
                    </div>
                    <div className="col-lg-3 col-sm-8">
                        <a href="/adminLogout" onClick={this.logOutAdmin}><i className="fa fa-lock fa-5x"></i><h6>Logout</h6></a>
      
                    </div>

                    <div className="col-lg-3 col-sm-8">
                        <a href="/pending"><i className="fa fa-envelope fa-5x"></i><h6>Pending Orders</h6></a>
      
                    </div>

                    <div className="col-lg-3 col-sm-8">
                        <a href="/working"><i className="fa fa-envelope fa-5x"></i><h6>Working Orders</h6></a>
      
                    </div>

                    <div className="col-lg-3 col-sm-8">
                        <a href="/delivered"><i className="fa fa-envelope fa-5x"></i><h6>Delivered Orders</h6></a>
      
                    </div>

                    <div className="col-lg-3 col-sm-8">
                        <a href="/orders"><i className="fa fa-envelope fa-5x"></i><h6>All Orders</h6></a>
      
                    </div>

                    

                </div>
              </div>

            </section>

            

            </React.Fragment>
        );
    }




}
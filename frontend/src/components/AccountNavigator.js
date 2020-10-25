import React from 'react';
import axios from 'axios';

const token = localStorage.getItem('user');
const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
})

export default class AccountNavigator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cartSum : '',
            category: [],
            name: ''
        }
    }

    componentDidMount =() =>{
        axios.get('/api/cart/cartSum')
        .then(result =>{
                this.setState({cartSum: result.data});
                
        });
        this.getCategory();
        this.getUserDetails();
        
    }
    getCategory = ()=>{
        axios.get('/category')
        .then(result =>{
            this.setState({category:result.data})  
        });
    }
    getUserDetails = ()=>{
        authAxios.get('/userDetails')
        .then(result =>{
            if(result.data === 'no user found'){
            }else{
                this.setState({name: result.data.first_name});
            
            }
        });
    }

    logout = (e)=>{
        e.preventDefault()
        localStorage.removeItem('admin');
        this.setState({isUser: ''});
        let redirect = '/adminlogin';
        window.location = redirect;
    }
    
    render(){
        const {cartSum,name} = this.state;
        const LoggedIn = 
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse-target">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapse-target">
            <a href="/" className="navbar-brand"><img src="/images/ff.jpg" /></a>
            <ul className="navbar-nav">
            <li className="nav-item">
                <a href="/" className="nav-link">Home</a>

            </li>
            
                
                <li className="nav-item">
                  <a href="/reports" className="nav-link">Make A report</a>
    
                </li>

                <li className="nav-item">
                 <a href="/return" className="nav-link">Return Order</a>
    
                </li>
                <li className="nav-item">
                <a href="/changepassword" className="nav-link">Change Password</a>
    
                </li>

                <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.logout}>Logout</a>
    
                </li>
    
            </ul>
        </div>
        <div>
            {name ? 
            <span className="text-white mx-3" >Hi <a style={{textDecoration : "none"}} className="text-white" href="/account">{name}</a></span>
             : null }
        </div>
        <div>
            <a href="/cart" className="text-white"><i className="fa fa-shopping-cart"></i><span className="mx-2">{cartSum}</span></a>
        </div>
       
    
    </nav>
                    
        return(
            
           <React.Fragment>
               {LoggedIn}
           </React.Fragment>
           
        );
    }
}
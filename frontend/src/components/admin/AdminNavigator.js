import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import axios from 'axios';


const token = localStorage.getItem('admin');
const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
})
export default class Navigator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user : '',
            pending: '',
            working: '',
            delivered: '',
            orders: ''
        }
        
    }

    componentDidMount =() =>{
        
        if(token){
            authAxios.post('/api/admin/loadAdminDetails')
            .then(result =>{
                this.setState({user: result.data.name})
                
            });
        }

        this.getPendingOrders();
        this.getWorkingOrders();
        this.getDeliveredOrders();
        this.getAllOders();
        
    }

    getAllOders = ()=>{
        axios.get('/api/admin/allOrders')
        .then(result =>{
            this.setState({orders : result.data});
            
        });
    }

    getPendingOrders = ()=>{

        axios.get('/api/admin/pendingOrders')
        .then(result =>{
            this.setState({pending : result.data});
            
        });
    }

    getWorkingOrders = ()=>{

        axios.get('/api/admin/workingOrders')
        .then(result =>{
            this.setState({working : result.data});
        });
    }

    getDeliveredOrders = ()=>{

        axios.get('/api/admin/deliveredOrders')
        .then(result =>{
            this.setState({delivered : result.data});
        });
    }

    
    
    render(){
        const {user,pending,working,delivered,orders} = this.state
        return(
            
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse-target">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapse-target">
                <a href="/adminhome" className="navbar-brand">Dashboard</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="/addProduct" className="nav-link">Add Products</a>
    
                    </li>
                    <li className="nav-item">
                        <a href="/addCategory" className="nav-link">Add Category</a>
    
                    </li>
                    <li className="nav-item">
                        <a href="/editProduct" className="nav-link">Edit Products</a>
    
                    </li>
                    <li className="nav-item">
                        <a href="/pending" className="nav-link"><span className="orders">{pending}</span>Pending </a>
    
                    </li>
                    <li className="nav-item">
                        <a href="/working" className="nav-link"><span className="orders">{working}</span>Working </a>
    
                    </li>
                    <li className="nav-item">
                        <a href="/delivered" className="nav-link"><span className="orders">{delivered}</span>Delivered </a>
    
                    </li>

                    <li className="nav-item">
                        <a href="/order" className="nav-link"><span className="orders">{orders}</span>Orders </a>
    
                    </li>
    
                </ul>
                 
            </div>

            <div>
                {user ? <span className="text-white">Hi {user}</span> : null}
            </div>
           

        </nav>
       
        );
    }
}
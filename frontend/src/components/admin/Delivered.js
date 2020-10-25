import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';



export default class Delivered extends React.Component{
    constructor(){
        super();
        this.state = {
    
            prod:[],
            actionSelected: '',
            selected: '',
            

            

        }
    }

    Handlechange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    
    }

    doAction = (e)=>{
        e.preventDefault();
        const print = this.state.actionSelected;
            if(print){
            localStorage.setItem('print',this.state.actionSelected);
            localStorage.setItem('filter','delivered');
            const url = '/print/';
            window.location = url;
            }else{
                alert("Kindly select appropriate action");
            }
    }

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin Delivered";
        this.getAllDelivered();
    }
    getAllDelivered = ()=>{
        axios.get('/api/admin/deliveredDetails')
        .then(resp =>{
            this.setState({prod: resp.data})
            
        });
    }

    render(){
        const {prod} = this.state;
        return(
            <React.Fragment>

            <AdminNavigator />
            <br/>
            <br/>
            <br/>
            <section id="adminBody" className="adminBody">

              <div className="container-sm">

                <div className="row">
                <div className="col-md-12 col-sm-12 mx-auto d-flex" >
                <table className="table table-stripped table-bordered">
                <tr>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Size </th>
                              <th>Qty</th>
                              <th>Futher Operations</th>
                              <th>Action</th>
                          </tr>
                    {prod.map(prod =>
                        <tr key={prod.prod_id}>
                        <td><img src={"/image/" + prod.image_name} width= "100" height="100" alt=""/></td>
                        <td>{prod.prod_name}</td>
                        <td># {prod.curr_price}</td>
                        <td>{prod.size}</td>
                        <td>{prod.qty}</td>
                        <td><select name="actionSelected" className="form-control" onChange={this.Handlechange}>
                            <option>Select action</option>
                            <option value={prod.order_code}>Print</option>
                        </select></td>
                        <td><button className="btn btn-lg bg-dark my-3 text-light form-control" onClick={this.doAction}>Continue</button></td>
                      </tr>
                    
                  )}
                  </table>
                  </div>
                  
                   </div>
                   </div>
               

            </section>

        

            </React.Fragment>
        );
    }




}
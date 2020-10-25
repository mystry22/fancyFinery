import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';



export default class Allorder extends React.Component{
    constructor(){
        super();
        this.state = {
    
            prod:[],
            action: '',
            selected: '',
            

            

        }
    }

    Handlechange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    
    }

    doAction = (e)=>{
        e.preventDefault();
        const reqType = this.state.action;

        if(reqType === 'pending'){
            const data = {
                prod_id : this.state.selected,
                status: reqType
            }
            axios.post('/api/admin/updateTrack',data)
            .then(resp =>{
                if(resp.data === 'done'){
                    alert('Operation Successful');
                }else{
                    alert('unable to complete request at the moment');
                }
            });
        }else {
            const url = '/print/:id' + this.state.reqType;
            window.location = url;
        }
    }

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin All Orders";
        this.getAllNone();
    }
    getAllNone = ()=>{
        axios.get('/api/admin/allNoneOrder')
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
                
                    {prod.map(prod =>
                  <div className="col-md-8 col-sm-6 mx-auto d-flex" key={prod.prod_id}>

                      <div className="product-holder d-flex">
                      <div className="image-holder">
                        <img src={"/image/" + prod.image_name} alt=""/> 
                      </div>

                      <div className="prod_details">
                        <h3>{prod.prod_name}</h3>
                        <span># {prod.curr_price}</span><br/>
                        <br/>
                        <span>{prod.size}</span><br/>
                        <br/>
                        <span>{prod.qty}</span><br/>
                        
                      </div>
                      
                      <div className="rs1-select2 ">
                          <form onSubmit={this.doAction}>
                              <input type='checkbox' name="selected" value={prod.prod_id} onChange={this.Handlechange} /><br/>
                              <select name="action" className="form-control" onChange={this.Handlechange}>
                                <option>Select action</option>
                                <option value="pending">Accept</option>
                                <option value={prod.order_date}>Print </option>
                              </select>
                      <button className="btn btn-lg bg-dark my-3 text-light form-control">Continue</button>
                       </form>
                      </div>       
                      </div>
                      
                      <hr/>
                  </div>
                    
                  )}
                  </div>
                </div>    
               

            </section>

        

            </React.Fragment>
        );
    }




}
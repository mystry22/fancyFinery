import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class EditProduct extends React.Component{
    constructor(){
        super();
        this.state = {
    
            prod:[]
            

        }
    }

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin Edit Products";
        this.getProducts();
    }
    getProducts = ()=>{
        axios.get('/loadAllProducts')
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
                  
                             <div className="col-12 d-flex justify-content-center mx-3 my-3" >
                                 <table className="table table-stripped table-bordered">
                                 <tr>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Futher Operations</th>
                                            <th>Add Variation</th>
                                            
                                        </tr>
                                        {this.state.prod.map(product =>
                                        <tr key={product.prod_id}>
                                            <td><Link to={'/editSingleProduct/:id'+product.prod_id}><img src={"/image/"+product.image_name}  width="100" height="100" /></Link></td>
                                            <td><Link to={'/editSingleProduct/:id'+product.prod_id}>{product.prod_name}</Link></td>
                                            <td><Link to={'/editSingleProduct/:id'+product.prod_id}><button className="btn btn-lg bg-dark my-3 text-light">Edit Product</button></Link></td>
                                            <td><Link to={'/addVariation/:id'+product.prod_id}><button className="btn btn-lg bg-dark my-3 text-light">Add Variation</button></Link></td>
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
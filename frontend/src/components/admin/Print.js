import React from 'react';
import axios from 'axios';


const token = localStorage.getItem('user');
const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
});
export default class Print extends React.Component{
    constructor(){
        super();
        this.state = {
    
            order:[],
            unique: '',
            order_code: '',
            grandTotal: [],
            deliveryCost: ''

            }
    }



    

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin Print";
        this.uniquePersonalDetails();
        this.totalOrder();
        this.grandTotal();
        this.getDeliveryFee();
    }

    uniquePersonalDetails =()=>{
        const code = localStorage.getItem('print');
        const data = {order_code: code
                    
        };
    
        axios.post('/api/admin/uniquePersonalDetails',data)
        .then(result =>{
            this.setState({unique: result.data});
        })
       
    }

    totalOrder =()=>{
        const fd = new  FormData();
        fd.append('ref',localStorage.getItem('print'));
        fd.append('filter', localStorage.getItem('filter'));
        
        axios.post('/api/admin/totalOrder',fd)
        .then(result =>{
            this.setState({order:result.data});
        })
    }

    grandTotal = ()=>{
        const fd = new  FormData();
        fd.append('ref',localStorage.getItem('print'));
        fd.append('filter', localStorage.getItem('filter'));
        axios.post('/api/admin/grandTotal',fd)
        .then(result =>{
            this.setState({grandTotal:result.data});
        })
    }

    getDeliveryFee = () =>{
        
        authAxios.get('/deliveryFee').then(
            res =>{
                this.setState({deliveryCost: res.data.deliveryCost});
                
            })
            
        
    }
   

    render(){
        const {unique,order,grandTotal,deliveryCost} = this.state;
        return(
            <React.Fragment>

            
            <br/>
            <br/>
            <br/>
            <section id="adminBody" className="adminBody">

              <div className="container-sm">
              <div className="row">
                  <h3 className="mx-auto">FancyFinery</h3>
                  </div>
                    <div className="row">

                        
                        <div className="col-md-6 col-sm-6 text-left">
                            <h4>Sales Invoice</h4>
                            <h5>Customer's Details</h5>
                            <p>
                                {unique.name} <br/>
                                {unique.address} <br/>
                                {unique.city} <br/>
                                {unique.state}
                            </p>
                        </div>

                        <div className="col-md-6 col-sm-6 text-right">

                        <h4>FancyFinery </h4>
                            <p>
                                11 silifat-akinsanya street <br/>
                                Surulere <br/>
                                Lagos
                            </p>

                        </div>
                    
                    </div>

                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                        <h3>Order Summary</h3>
                        <h5>Order Code    {unique.order_code}</h5>
                       

                        Dear {unique.name}, <br/>

                        <p>
                            Thank you for shopping with us at Fancyfinery and we are delighted to have you as a cutomer.
                        </p>
                        <p>
                            FancyFinery is your #1 stop for all your fashion needs. if you have only recieved part of your 
                            order do not worry as  outstanding items will be shipped and delivered in no time.
                        </p>

                        <p>
                            Kindy <b>Note</b> that the total sum includes delivery charge.<br/>
                            for enquiry, suggestions and complaint Kindy visit https://fancyfinery/contact <br/>
                            Thank you once again for shopping with us<br/>
                            Yours Sincerely<br/>
                            fancyfinery team
                        </p>
                        </div>
                    </div>
                <div className="row">
                  
                <div className="col-sm-12 col-md-12 mx-auto">
                    <h4>ORDER DETAILS</h4>
                      <table className="table table-stripped table-bordered">
                          <tr>
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Total</th>
                          </tr>
                          {order.map(order =>
                            <tr key={order.order_code}>
                                <td>{order.prod_name}</td>
                                <td># {order.curr_price}</td>
                                <td>{order.qty}</td>
                                <td>#{order.subtotal}</td>
                            </tr>
                            )}
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              {grandTotal.map(grand =>
                               <td key={grand.order_code}>{grand.subtotal + deliveryCost}</td>
                                )}
                          </tr>
                      </table>

                     
                    </div>
                  </div>

                  <div className="row">
                      <div className="col-md-12 col-sm-12"> 
                      <span className="text-right">Received By....................................................................................................Sign/Date............................................................................</span>
                      </div>
                 
                  </div>
                </div>    
               

            </section>

        

            </React.Fragment>
        );
    }




}
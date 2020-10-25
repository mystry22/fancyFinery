import React from 'react';
import axios from 'axios';
import Navigator from './Navigator';




const token = localStorage.getItem('user');
const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
});
export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : '',
            order: ''
            
            }
            this.variation = React.createRef();
    }

    componentDidMount =() =>{
        document.title = "Fancyfinery | Account";
        
        
        authAxios.get('/getRefOrder')
        .then(result =>{
			this.setState({display: result.data});
			
        });
        
        
    }

    showDetails =(e,order_code) =>{
        e.preventDefault();
        const fd = new FormData();
        fd.append('ordCode',order_code);
        axios.post('/ordDetails',fd).
        then(res =>{
            this.setState({showDisplay : res.data});
            this.setState({order: !this.state.order});
            
        });
    }
 
    render(){
        const {display,order} = this.state;
        return(
            <React.Fragment>
            <Navigator />
            <br/>
            <br/>
            <br/>
			<section className="product-details">
				<div className="container">
					<div className="row">
						 
                        
                        <div className="col-md-8 col-lg-8 col-sm-8 mx-auto">
                        {display  ? 
                            <table className="table">
                                <tr>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Order Refrence</th>
                                </tr>
                                {display.filter(display => display.status !== 'None').map(filtered =>
                                <tr key={filtered.id}>
                                    <td>{filtered.order_date.substr(0,10)}</td>
                                    <td>{filtered.status}</td>
                                    <td>{filtered.prod_name}</td>
                                    <td>{filtered.curr_price}</td>
                                    <td>{filtered.qty}</td>
                                    <td>{filtered.order_code}</td>
                                </tr>
                                )}
                            </table>
                            : <h1>No Order History</h1>}
                        </div>  
                      
                    </div>
				</div>
			</section>
            
            </React.Fragment>
        );
    }
}
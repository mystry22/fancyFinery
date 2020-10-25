import React from 'react';
import {Link} from 'react-router-dom';
import Navigator from './Navigator';
import Footer from './footer';
import Slide from './slide';
import axios from 'axios';



export default class Home extends React.Component{

    constructor(){
        super();
        this.state = {
			prod: [],
			userDetails:'',
			category: []
			
        }
    }
    
    
    componentDidMount = ()=>{
		document.title = "Fancyfinery | Home";
		this.getProducts();
		
		
    }
    getProducts = () =>{
        axios.get('/api/mydata')
        .then(resp =>{
            this.setState({prod: resp.data})
        });
	}
	
	

    
    render(){
		const userDetails = this.state;
        return(
            <React.Fragment>
	<section className="bg0 p-t-23 p-b-140">
	<Navigator />
	<Slide />
	</section>

<hr/>
	<section className="customer-section">

		<div className="container">

			<div className="row">
					<div className="rs1-select2 col-lg-4 col-sm-6">
					 <h2 className="text-center">Customer Support <i className="fa fa-phone"></i></h2>
					 <p className="text">At FancyFinery customer's satisfaction is key
					 that is why we have put in place a 24/7 customer
					  assitance line </p>
					</div>
					<div className="rs1-select2 col-lg-4 col-sm-6 my-3">
					<h2 className="text-center">Subscribe <i className="fa fa-envelope"></i></h2>
					 <form onSubmit={this.subscribeMail} className="form">
						 <input type="email" className="form-control" name="mail" onChange={this.handleChange} placeholder="Email" />
						 <button className="btn btn-lg bg-dark my-3 text-light form-control">Send</button>
						 <br/>
					 </form>
					</div>
					<div className="rs1-select2 col-lg-4 col-sm-6">
					<h2 className="text-center">Free Return <i className="fa fa-refresh"></i></h2>
					 <p className="text">As part of our effort in ensuring maximum customer satisfaction we do not
					 
					 charge on returns </p>
					</div>
					
			</div>

		</div>

	</section>

	<hr/>

	<section className="Products">
		<div className="container">
			<div className="row">
				<div className="col-sm-8 col-lg-4 mx-auto text-center text-capitalize">
					<h2 className="featured">Featured Products</h2>
					
				</div>
			</div>

			<div className="row">
				{this.state.prod.map(prod =>
				<div className="col-sm-4 col-md-4 mx-auto my-3"key={prod.prod_id}>
					<div className="product-box">
						<div className="img-container">
							<Link to={"/product/:id"+prod.prod_id}><img src={"/image/"+prod.image_name} className="card-img-top" /></Link>
						</div>	
						<div className="product-details">
							<div className="prod_details d-flex justify-content-between">
								<div>
								<h5>#{prod.curr_price}</h5>
								<h6><del>#{prod.old_price}</del></h6>
								</div>
							    
								<Link to={"/product/:id"+prod.prod_id}><h4>{prod.prod_name}</h4></Link>
								

							</div>
						</div>
					</div>

					
				</div>	
				)}
				
			</div>
		</div>

	</section>

	<hr/>

	
	
	<Footer/>
    </React.Fragment> 
        );
    }
}
import React from 'react';
import Navigator from './Navigator';
import Footer from './footer';
import axios from 'axios';

export default class Cart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cartItems : [],
			subArray: [],
			prod_id: ''
		}
	}

		componentDidMount = ()=>{
			document.title = "Fancyfinery | Cart";
			axios.get('/api/cart/cartItems')
			.then(result =>{
				this.setState({cartItems: result.data})
				
			});
			this.getTotal();

		}

		getTotal = ()=>{
			axios.get('/api/cart/getTotalSum')
			.then(res =>{
				this.setState({subArray: res.data})
			});
		}

		

		renderCartItems = ()=>{
			const deleteProduct = (prod_id)=>{
				let data ={
					prod_id: prod_id
				};
				axios.post('/api/cart/deleteCartItem',data)
				.then(result =>{
					if(result.data === 'cart item deleted'){
						document.location.reload(true);
					}else{
						console.log(result.data);
					}
				})
			}

			const {subArray} = this.state;
			

			if(this.state.cartItems.length === 0) return <p>Empty Cart</p>

			return <React.Fragment>
				
				<table className="table">
			<thead>
				<th scope="col">Product</th>
				<th scope="col">Name</th>
				<th scope="col">Unit_Price</th>
				<th scope="col">Qty</th>
				<th scope="col">Subtotal</th>
			</thead>
                  {this.state.cartItems.map(cart =>
					<tr key={cart.prod_id}>
						<td>
						
							<img  src={"/image/"+ cart.image_name} alt="" width="40px" height="40px"/>
						
						</td>
						
						<td><span>{cart.prod_name}</span></td>
				  		<td><span>{cart.curr_price}</span></td>
						<td><span>{cart.qty}</span></td>
				  		<td><span>{cart.subtotal}</span></td>
						<td><button className="btn" onClick={()=>deleteProduct(cart.prod_id)}><i className="fa fa-trash fa-2x" style={{cursor:"pointer"}}></i></button></td>
					</tr>
					
					)}
			
		</table>
		<div className="">
			<div className="d-flex justify-content-between">
			<h4>Total</h4> 
				  <h4>#{subArray.map(sub=>
				    <span key={sub._id}>{sub.subtotal}</span>
					)}</h4>
			</div>
			
			<div><a href="/delivery/"><button className="btn btn-lg bg-dark my-3 text-light ">Checkout</button></a></div>
			
		</div>
		</React.Fragment>
		}

	

	render(){
		return(
			<React.Fragment>
                <Navigator/>
				<div className="container">
					<div className="row">
						<div className="col-xs-4 col-sm-8 col-lg-8 mx-auto my-3">
						<br/>
						<br/>
						<br/>
							{this.renderCartItems()}
							
						</div>
					</div>

				</div>
			
			</React.Fragment>
		);
	}
}
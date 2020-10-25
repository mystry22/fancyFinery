import React from 'react';
import Navigator from './Navigator';
import axios from 'axios';
import {PaystackButton } from 'react-paystack';



const token = localStorage.getItem('user');
const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
});


const genRefrence = ()=>{
	const min = 1000000;
	const max = 9999999;
	const cons = 'ref';
	const code = Math.floor(Math.random() * max) + min;
	const ref = cons.concat(code);
	return ref;
};

export default class Payment extends React.Component{
	constructor(props){
		super(props);
		this.state={
			ip: '',
			subArray: [],
			email: '',
			amount : '',
			deliveryCost: '',
			user: ''
		}
		this.amount = React.createRef();
	}

		componentDidMount = ()=>{
			document.title = "Fancyfinery | Payment";
			this.getUserDetails();
			this.getTotal();
			this.getIp();
			
			this.getDeliveryFee();

		}
		getUserDetails = ()=>{
			authAxios.get('/userDetails')
			.then(result =>{
				if(result.data === 'no user found'){
				}else{
					this.setState({email: result.data.email});
					this.setState({user: result.data.username});
				
				}
			});
		}

		getTotal = ()=>{
			
			axios.get('/api/cart/getTotalSum')
			.then(res =>{
				this.setState({subArray: res.data});
				const isSet = true;
				if(isSet){
					this.setState({amount: this.state.subArray[0].subtotal });
				}
				
				
				
            });
            
		}

		getIp = ()=>{
			axios.get('/api/ip/getclientsIp')
			.then(ip =>{
				this.setState({ip:ip.data});
				
			});
	
		}

		getDeliveryFee = () =>{
			const fd = new FormData();
			fd.append('user',this.state.user);
			authAxios.get('/deliveryFee',fd).then(
				res =>{
					this.setState({deliveryCost: res.data.deliveryCost});
					
				}
			)
		}
		

		

	render(){
		const totalGig = parseInt(this.state.amount) + parseInt(this.state.deliveryCost);
		
		const data = {
			ip : this.state.ip,
			email: this.state.email
		};
		const config = {
			reference: genRefrence(),
			email: this.state.email,
			amount: parseInt(this.state.amount + this.state.deliveryCost) *100,
			publicKey: 'pk_test_0e73cfbb6c5273ec366b95f9f512686ac46950c3',
		};
		
		const componentProps = {
			...data,
            ...config,
            text: '',
			onSuccess: () => 
			
			axios.post('/afterPayment',data).then(result =>{
				if(result.data === 'ok'){
					window.location = '/success/';
				}else{

				}
			})
			,
            onClose: () => null
		};
		
		return(
			<React.Fragment>
                <Navigator/>
				
				<div className="container">
					<div className="row">
						<div className="col-xs-4 col-sm-6 col-lg-6 mx-auto my-3">
						<br/>
						<br/>
						<br/>
						<h5 className="text-center">Payment</h5>
							<p>Kindly note that a delivery fee of N{this.state.deliveryCost} has been added, and the total is below</p>
						  
                                <input  type='text' value={totalGig} className="form-control" name="amount" ref={this.amount} />
								
						
                             
							 
							 <br/>
							
							 
                        <PaystackButton {...componentProps} ><img src="/images/pay.jpg" width="548px"/> </PaystackButton>
					
						</div>
					</div>
					
				</div>
				
			
		);
			</React.Fragment>
		);
	}
}
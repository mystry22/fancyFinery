import React from 'react';
import Navigator from './Navigator';
import Footer from './footer';
import axios from 'axios';

const token = localStorage.getItem('user');
const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
});

export default class Delivery extends React.Component{
	constructor(props){
		super(props);
		this.state={
			fullName : '',
			address: '',
			city: '',
			state: '',
			phone : '',
			dbRes: '',
			cartSum: '',
			deliveryCost: '',
			user: ''
			
		}
		this.state = React.createRef();
	}

		componentDidMount = ()=>{
		
			document.title = "Fancyfinery | Delivery";
			this.checkSignOn();
			this.userDetails();
			this.cartSum();

		}

		userDetails =()=>{
			authAxios.get('/userDetails')
			.then(res =>{
				const fname = res.data.first_name;
				const lname = res.data.last_name;
				const flname = fname +' '+lname;
				this.setState({fullName: flname});
				this.setState({user:res.data.username});
			})
		}

		handleChange = (e) =>{
			e.preventDefault();
			this.setState({[e.target.name]: e.target.value})
		}

        doDelivery = (e)=>{
			e.preventDefault();
			const fd = new FormData();
			fd.append('name',this.state.fullName);
			fd.append('address',this.state.address);
			fd.append('phone',this.state.phone);
			fd.append('city',this.state.city);
			fd.append('state',this.state.state);
			fd.append('deliveryCost',this.state.deliveryCost);
			fd.append('user', this.state.user);
			axios.post('/completeOrder',fd)
			.then(res =>{
				if(res.data === 'ok'){
					const redirect = '/payment';
					window.location = redirect;
				}else{
					alert('Sorry we are unable to process to order at the moment');
					
				}
				
			});
		 
		}

		cartSum = () =>{
			axios.get('/api/cart/cartSum')
			.then(result =>{
					this.setState({cartSum: result.data});
					
			});
		}
		scheduleDelPrice = (e) =>{
			e.preventDefault();
			this.setState({[e.target.name]: e.target.value});
			const delState = this.state.current.value;
			const forLagos = 1000;
			const forOthers = 1500;
			const cartSum = parseInt(this.state.cartSum);
			
			
			if(delState === 'Lagos'){
				if(cartSum > 1){
				
					const depFactor = cartSum * forLagos;
					const factor = 0.25 * depFactor;
					const deliveryCost = forLagos + factor;
					this.setState({deliveryCost});
				
				}else{
					this.setState({deliveryCost: forLagos});
					
				}
			}else{
				if(cartSum > 1){
					const depFactor = cartSum * forOthers;
					const factor = 0.25 * depFactor;
					const deliveryCost = forOthers + factor;
					this.setState({deliveryCost});
			
				}else{
					this.setState({deliveryCost: forOthers});
					
				}
			}
		}

        checkSignOn = ()=>{
            let user = localStorage.getItem('user');
            if(user){

            }else{
                const random = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbnVzZXIiOiJteXN0cnkiLCJpYXQiOjE2MDA2NTI1MzcsImV4cCI6MTYwMDY1NjEzN30.ZZMj4HdxrTaIBf8snd3GgOmrxBqkCVabv5YJJ1hLx8k';
                const redirect = localStorage.setItem('url',random);
                const url = '/login';
                window.location = url;
            }
        }

		

	

	render(){
		const {fullName,dbRes} = this.state;
		return(
			<React.Fragment>
                <Navigator/>
				<div className="container">
					<div className="row">
						<div className="col-xs-4 col-sm-8 col-lg-8 mx-auto my-3">
						<br/>
						<br/>
						<br/>
						{dbRes ? <div className="alert alert-success">{dbRes}</div>: null}
					
                           <form onSubmit={this.doDelivery} className="form-group">

                               <h4>Shippment Details</h4>
							   <input type="text" name="name" className="form-control " value={fullName} required /><br/>
							   
							   <input type="text" name="phone" className="form-control " placeholder="Phone Number" required onChange={this.handleChange} /><br/>
							   <input type="text" name="address" className="form-control" placeholder="Delivery Address" required onChange={this.handleChange} /><br/>
							   <input type="text" name="city" className="form-control" placeholder="City" required onChange={this.handleChange}/><br/>
							   <select name="state" className="form-control" onChange={this.scheduleDelPrice} ref={this.state} >
										<option disabled selected>--Select State--</option>
										<option value="Abia">Abia</option>
										<option value="Adamawa">Adamawa</option>
										<option value="Akwa Ibom">Akwa Ibom</option>
										<option value="Anambra">Anambra</option>
										<option value="Bauchi">Bauchi</option>
										<option value="Bayelsa">Bayelsa</option>
										<option value="Benue">Benue</option>
										<option value="Borno">Borno</option>
										<option value="Cross Rive">Cross River</option>
										<option value="Delta">Delta</option>
										<option value="Ebonyi">Ebonyi</option>
										<option value="Edo">Edo</option>
										<option value="Ekiti">Ekiti</option>
										<option value="Enugu">Enugu</option>
										<option value="FCT">Federal Capital Territory</option>
										<option value="Gombe">Gombe</option>
										<option value="Imo">Imo</option>
										<option value="Jigawa">Jigawa</option>
										<option value="Kaduna">Kaduna</option>
										<option value="Kano">Kano</option>
										<option value="Katsina">Katsina</option>
										<option value="Kebbi">Kebbi</option>
										<option value="Kogi">Kogi</option>
										<option value="Kwara">Kwara</option>
										<option value="Lagos">Lagos</option>
										<option value="Nasarawa">Nasarawa</option>
										<option value="Niger">Niger</option>
										<option value="Ogun">Ogun</option>
										<option value="Ondo">Ondo</option>
										<option value="Osun">Osun</option>
										<option value="Oyo">Oyo</option>
										<option value="Plateau">Plateau</option>
										<option value="Rivers">Rivers</option>
										<option value="Sokoto">Sokoto</option>
										<option value="Taraba">Taraba</option>
										<option value="Yobe">Yobe</option>
										<option value="Zamfara">Zamfara</option>
									</select>
	

							   <button className="btn btn-sm bg-dark my-3 text-light form-control">Complete Order</button>

                           </form>
							
						</div>
					</div>

				</div>
				<Footer/>
			</React.Fragment>
		);
	}
}
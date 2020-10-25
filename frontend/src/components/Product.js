import React from 'react';
import axios from 'axios';
import Navigator from './Navigator';
import Footer from './footer';




export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : '',
            ip : '',
            size: '',
            subTotal: '',
            count: 1,
            
            }
            this.variation = React.createRef();
    }

    componentDidMount =() =>{
        document.title = "Fancyfinery | Product";
        const id = this.props.match.params.id;
        
        axios.get('/getProduct/'+id)
        .then(result =>{
			this.setState({display: result.data});
			
        });
        this.getIp();
        
    }
    sizeHandlechange = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
    }
   
    getIp = async () =>{
       await axios.get('/api/ip/getclientsIp')
        .then(response =>{
            this.setState({ip: response.data})
        });
	}
	doAdd = (e) =>{
		e.preventDefault();
        this.setState({count: this.state.count +1});
        
	}
	doSub = (e) =>{
        e.preventDefault();
		this.setState({count: this.state.count -1});
    }
    subTotalHandleChange = (e) =>{
        this.setState({subTotal: e.target.value });
        
    }
    addToCart = (e) =>{
        e.preventDefault();

        const data ={
            prod_id: this.state.display.prod_id,
            ip : this.state.ip,
            prod_name: this.state.display.prod_name,
            image_name: this.state.display.image_name,
            curr_price: this.state.display.curr_price,
            size: this.state.size,
            qty: this.state.count,
            subTotal: this.state.subTotal
            
        };
        
        
        axios.post('/api/cart/addToCart',data)
        .then(resp =>{
           const result = resp.data;
           if(result === 'ok'){
               alert('Product Added To Cart');
               document.location.reload();
           }else if(result === 'exist'){
                alert('product already in the cart');
           }else{
               alert('error');
           }
        })

    }

    handleVariation = (e)=>{
        e.preventDefault();
        
        const variation = this.variation.current.value;
        const redirect = '/variation/:id'+variation;
        window.location = redirect;
       
    }
    
    render(){
        return(
            <React.Fragment>
            <Navigator />
            <br/>
            <br/>
            <br/>
			<section className="product-details">
				<div className="container">
					<div className="row d-flex justify-content-between">
						<div className="col-10 col-sm-8 col-lg-4 mx-auto my-3">
							<div className="card">
								<div className="img-container">
									<img src={"/image/"+this.state.display.image_name} alt="" className="card-img-top" />
								</div>
                                <div className="d-flex justify-content-between mx-3">
                                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
								{this.state.display.prod_name}
							</h4>

							<span className="mtext-106 cl2">
							 	#{this.state.display.curr_price}
                                 
							</span>
                            </div>
							</div>
						</div>

						<div className="col-sm-8 col-lg-4 mx-auto my-3 ">

                        <div className="p-r-50 p-t-5 p-lr-0-lg">
							

							<p className="stext-102 cl3 p-t-23">
								{this.state.display.description}
							</p>

							<p className="stext-102 cl3 p-t-23">
								All Products are designed and perfected to suit the most in trend fashion
							</p>
							
							<form onSubmit={this.addToCart}>
							<div className="p-t-33">
								<div className="flex-w flex-r-m p-b-10">
									<div className="size-203 flex-c-m respon6">
										Size
									</div>

									<div className="size-204 respon6-next">
										<div className="rs1-select2 bor8 bg0">
											<select className="form-control" name="size" onChange={this.sizeHandlechange} required>
                                                <option value="">Select Size</option>
                                                <option value="12">Size 12</option>
												<option value="14">Size 14</option>
												<option value="16">Size 16</option>
												<option value="18">Size 18</option>
											</select>
											<div className="dropDownSelect2"></div>
										</div>
									</div>

                                    <div className="size-203 flex-c-m respon6">
										Variation
									</div>

									<div className="size-204 respon6-next">
										<div className="rs1-select2 bor8 bg0">
											<select className="form-control" name="variation" ref={this.variation} onChange={this.handleVariation} >
                                                <option value="">Select Variation</option>
												<option value={this.state.display.variation_name1}>{this.state.display.variation_name1}</option>
												<option value={this.state.display.variation_name2}>{this.state.display.variation_name2}</option>
												<option value={this.state.display.variation_name3}>{this.state.display.variation_name3}</option>
												
											</select>
                                            <div className="dropDownSelect2"></div>
										</div>
									</div>	
								</div>
                            
                        
                                <div className="d-flex justify-contents-between">
                                    <div><button className="btn btn-sm mx-3 btt " onClick={this.doSub}><i className="fa fa-minus fa-2x " ></i></button></div>
                                   
                                    <input type="text" size="2" value={this.state.count} />

                                    <div><button className="btn btn-sm btt " onClick={this.doAdd}><i className="fa fa-plus fa-2x" ></i></button></div>
                                    
                                </div>
                                <div>
                                    <label>Total </label>
                                    <input type="text" name="subTotal" value={(parseInt(this.state.display.curr_price)*this.state.count)} onChange={this.subTotalHandleChange}/>
                                </div>
                                <div>
                                    <button className="btn btn-sm my-3 bg-dark text-light">Add To Cart</button>
                                </div>
                            </div>
                            </form>
                            </div>
                        </div>
                    </div>
				</div>
			</section>
            <Footer />
            </React.Fragment>
        );
    }
}
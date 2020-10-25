import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';




export default class EditSingleProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : '',
            selectedFile: null,
            prod_name: '',
            curr_price: '',
            old_price: '',
            description: '',
            category: [],
            cat: '',
            prod_id: '',
            display_home: '',
            dbRes: ''
			
        }

    }

    componentDidMount =() =>{
        document.title = "Fancyfinery | Admin Edit Single Product";
        const id = this.props.match.params.id;
        
        axios.get('/getProduct/'+id)
        .then(result =>{
            this.setState({
                prod_name: result.data.prod_name,
                curr_price: result.data.curr_price,
                old_price: result.data.old_price,
                description: result.data.description,
                image_name:result.data.image_name,
                cat: result.data.cat_name,
                prod_id: result.data.prod_id,
                display_home : result.data.display_home
             });
			
        });
        this.getCategory();
    
        
    }
    getCategory = ()=>{
        axios.get('/category')
        .then(result =>{
            this.setState({category:result.data})
            
        });
        
    }
    display_home = async(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.display_home)

        let fd = new FormData();
        fd.append('prod_id',this.state.prod_id);
        fd.append('display_home',this.state.display_home)

        await axios.post('/api/admin/displayHome',fd,{
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(result =>{
            this.setState({dbRes: result.data})
        });


    }

    handleChange = (e)=>{
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    } 
    handleFileChange =(e)=>{
        const {selectedFile} = this.setState;
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    update = async (e)=>{
        e.preventDefault();
        const file = this.state.selectedFile;
        console.log(this.state);
        const fd = new FormData();
        if(file){
            fd.append('image', file,file.name);
            fd.append('prod_name',this.state.prod_name);
            fd.append('curr_price',this.state.curr_price);
            fd.append('old_price',this.state.old_price);
            fd.append('description',this.state.description);
            fd.append('cat_name',this.state.cat);
            fd.append('prod_id',this.state.prod_id);
            fd.append('display_home',this.state.display_home);
            

           await axios.post('/api/admin/updateProdWithImage', fd,{
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(result =>{
              if(result.data === 'update done'){
                 this.setState({dbRes: 'Product Updated'});
              }else{
                 
                 this.setState({dbRes: result.data});
              }
            });
        }else{
            
            fd.append('prod_name',this.state.prod_name);
            fd.append('curr_price',this.state.curr_price);
            fd.append('old_price',this.state.old_price);
            fd.append('description',this.state.description);
            fd.append('cat_name',this.state.cat);
            fd.append('prod_id',this.state.prod_id);
            fd.append('display_home',this.state.display_home);
            

            axios.post('/api/admin/updateProd', fd,{
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(result =>{
              if(result.data === 'update done'){
                 this.setState({dbRes: 'Product Updated'});
              }else{
                 
                 this.setState({dbRes: result.data});
              }
            });
        }
            
        

    }

    deleteProduct = (e)=>{
        e.preventDefault();
        let fd = new FormData();
        fd.append('prod_id',this.state.prod_id);

        axios.post('/api/admin/deleteProduct',fd,{
            headers : {'Content-Type': 'multipart/form-data'}
        })
        .then(result =>{
            if(result.data === 'deleted'){
                const url = '/editProduct';
                window.location = url;
            }else{
                this.setState({dbRes: result.data})
            }
        });
    }

    render(){
        const {category,dbRes,display_home} = this.state;
        return(
            <React.Fragment>
            <AdminNavigator />
			<section className="product-details">
				<div className="container">
					<div className="row d-flex justify-content-between">
						<div className="col-10 col-sm-8 col-lg-4 mx-auto my-3">
                        <br/>
                                    <br/>
                                    <br/>
                        {dbRes ? <div className="alert alert-success">{dbRes}</div>: null}
                          
							<div className="card">
								<div className="img-container">
                                   
                                    
									<img src={"/image/"+this.state.image_name} alt="" className="card-img-top" />
                                    
								</div>
							</div>
						</div>
                        <br/>
                        <br/>
						<div className="col-10 col-sm-8 col-lg-4 mx-auto my-3 ">
                        
                        <div className="p-r-50 p-t-5 p-lr-0-lg">
                            <br></br>
                            <br></br>
                        <form onSubmit={this.update}>
							<h4 className="mtext-105 cl2 js-name-detail p-b-14">
								<label >Product Name</label>
							</h4>
                            <span className="mtext-106 cl2">
                            <input type="text" name="prod_name" defaultValue={this.state.prod_name}  onChange={this.handleChange} />
                            </span>

                            <h4 className="mtext-105 cl2 js-name-detail p-b-14">
								<label >Current Price</label>
							</h4>
                            <span className="mtext-106 cl2">
                            <input type="text" name="curr_price" defaultValue={this.state.curr_price} onChange={this.handleChange} />
                            </span>

                            <h4 className="mtext-105 cl2 js-name-detail p-b-14">
								<label >Old Price</label>
							</h4>
							<span className="mtext-106 cl2">
                            <input type="text" name="old_price" defaultValue={this.state.old_price} onChange={this.handleChange} />
                                 
							</span>

							<p className="stext-102 cl3 p-t-23">
                                <textarea name="description" onChange={this.handleChange} defaultValue={this.state.description}></textarea>
                                
							</p>

                            <div className="size-204 respon6-next">
										<div className="rs1-select2 bor8 bg0">
											<select className="js-select2" name="cat" onChange={this.handleChange}>
												<option>Choose a Category</option>
                                                {category.map(catDetails =>
                                                <option key={catDetails.cat_id} value={catDetails.cat_name}>{catDetails.cat_name}</option>

                                                )}
												
											</select>
											<div className="dropDownSelect2"></div>
										</div>
							</div>
                         
                            
                                <label for="questoniare">Display Home</label>
										<input type="radio" name="display_home" value="yes" onChange={this.handleChange}/>
                                        <label for="yes">Yes</label>
                                        <input type="radio" name="display_home" value=" " onChange={this.handleChange} />
                                        <label for="no">No</label>
										
							
							
                            <span className="mtext-106 cl2">
                            <input type="file" name='image' onChange={this.handleFileChange} />
                             </span>  
                                <div>
                                    <button className="btn btn-lg bg-dark my-3 text-light">Update</button>
                                </div>
                            
                            </form>

                            <button className="btn btn-lg bg-dark my-3 text-light" onClick={this.deleteProduct}>Delete</button>
                            </div>
                        </div>
                    </div>
				</div>
			</section>
        
            </React.Fragment>
        );
    }
}
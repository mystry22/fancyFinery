import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';


export default class AddProduct extends React.Component{
    constructor(){
        super();
        this.state = {
            category: [],
            prod_name:'',
            old_price:'',
            curr_price:'',
            desc:'',
            cat_name:'',
            selectedFile: null,
            dbRes: ''

        }
    }

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin Add Product";
        this.getCategory();
    }

    getCategory = ()=>{
        axios.get('/category')
        .then(result =>{
            this.setState({category:result.data})
            
        });
    }

    imageChange = (e)=>{
        const {selectedFile} = this.setState;
        this.setState({
            selectedFile: e.target.files[0]
        });
        
    }

    addProduct = (e)=>{
        e.preventDefault();
        let {dbRes} = this.state;

        let fd = new FormData();
        fd.append('prod_name',this.state.prod_name);
        fd.append('old_price',this.state.old_price);
        fd.append('curr_price',this.state.curr_price);
        fd.append('desc',this.state.desc);
        fd.append('cat_name',this.state.cat_name);
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name); 
       axios.post('/api/admin/insertProduct', fd,{
           headers: {'Content-Type': 'multipart/form-data'}
       })
       .then(result =>{
         if(result.data === 'done'){
            this.setState({dbRes: 'New product added'});
         }else{
            
            this.setState({dbRes: result.data});
         }
       });

    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    render(){
        const {category,dbRes} = this.state;
        return(
            <React.Fragment>

            <AdminNavigator />
            
            <section id="adminBody" className="adminBody">

              <div className="container-sm">
              <div className=" col-sm-6 col-lg-6 mx-auto my-3">

                <div className="form-container-for-others">
                
               {dbRes ? <div className="alert alert-success">{dbRes}</div>: null}
               <h5 className="text-center" >Add Product</h5>
                <div className="form-group">
                    <form onSubmit={this.addProduct} className="form" >

                        <label for="image" className="form-control">Product Image</label>
                        <input type="file" name="file" id="prodImg" onChange={this.imageChange} required/>

                        <label for="productName" className="form-control">Product Name</label>
                        <input type="text" for="prod_name" name="prod_name" id="prod_name" className="form-control" onChange={this.handleChange} required/>

                        <label for="Old Price" className="form-control">Old Price</label>
                        <input type="text" for="old_price" name="old_price" id="old_price" className="form-control" onChange={this.handleChange} required/>

                        <label for="Current Price" className="form-control">Current Price</label>
                        <input type="text" for="curr_price" name="curr_price" id="curr_price" className="form-control" onChange={this.handleChange} required/>

                        <label for="desc" className="form-control">Description</label>
                        <input type="text" for="desc" name="desc" id="desc" className  ="form-control" onChange={this.handleChange} required/>

                        <label for="category" className="form-control">Product Category</label>

                        <select name="cat_name" className="form-control" onChange={this.handleChange}>
                        {category.map(cat =>
                        <option value={cat.cat_name} key={cat.cat_id}  >{cat.cat_name}</option>
                        )}
                        </select>
                        <br/>
                        <br/>
                        <button className="btn btn-lg bg-dark my-3 text-light form-control ">addProduct</button>

                    </form>
                </div>
              </div>
            </div>
            </div>
            </section>

            

            </React.Fragment>
        );
    }




}
import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';


export default class AddCategory extends React.Component{
    constructor(){
        super();
        this.state = {
            category: [],
            cat_name:'',
            dbRes: '',
            delete_cat: ''

        }
    }

    componentDidMount = ()=>{
        
        document.title = "Fancyfinery | Admin AddCategory";
        this.getCategory();
    }

    getCategory = ()=>{
        axios.get('/category')
        .then(result =>{
            this.setState({category:result.data})
            
        });
    }

    addCategory = (e)=>{
        e.preventDefault();

        let fd = new FormData();
        fd.append('prod_cat',this.state.cat_name);
     
       axios.post('/api/admin/addCategory', fd,{
           headers: {'Content-Type': 'multipart/form-data'}
       })
       .then(result =>{
         if(result.data === 'new category added'){
            this.setState({dbRes: 'New Category added'});
            document.location.reload(true);
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

    deleteCategory = (e)=>{
        e.preventDefault();
        const fd = new FormData();
        fd.append('prod_cat',this.state.delete_cat);

        axios.post('/api/admin/deleteCategory',fd)
              .then(result =>{
                if(result.data === 'category deleted successfuly'){
                    this.setState({dbRes: 'Category Deleted Successfuly'})
                    document.location.reload(true);
                }else{
                    this.setState({dbRes: result.data})
                }
              });

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
                    

                   
              {dbRes ? <div className="alert alert-success mx-3">{dbRes}</div>: null}
        
                <h5 className="text-center">Add Category</h5>
                <div className="form-group">
                    <form className="form" onSubmit={this.addCategory}   >

                        
                        <label for="cat" className="form-control">Available Category</label>
                        <select name='avail_cat' className="form-control">
                            {category.map(cat =>
                                <option value={cat.cat_name} key={cat.cat_id}>{cat.cat_name}</option>
                            )}

                        </select>
                        

                        <label for="productName" className="form-control">Category Name</label>
                        <input type="text" for="cat_name" name="cat_name" id="cat_name" className="form-control" onChange={this.handleChange} required/>

                        
                        
                        <br/>
                        <button className="btn btn-sm bg-dark my-3 text-light form-control ">addCategory</button>

                    </form>
                </div>

                <h5 className="text-center">Delete Category</h5>
                <div className="form-group">
                    <form className="form" onSubmit={this.deleteCategory}  >

                        
                        <label for="cat" className="form-control">Delete Category</label>
                        <select name='delete_cat' className="form-control" onChange={this.handleChange}>
                            {category.map(cat =>
                                <option value={cat.cat_name} key={cat.cat_id}>{cat.cat_name}</option>
                            )}

                        </select>
                        
                        
                        <br/>
                        <button className="btn btn-sm bg-dark my-3 text-light form-control ">deleteCategory</button>

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
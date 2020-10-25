import React from 'react';
import AdminNavigator from './AdminNavigator';
import axios from 'axios';


export default class AddVariation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            var_name:'',
            selectedFile: null,
            dbRes: '',
            display: ''

        }
    }

    componentDidMount = ()=>{
        document.title = "Fancyfinery | Admin Add Variations";
        const id = this.props.match.params.id;
        axios.get('/getProduct/'+id)
        .then(result =>{
			this.setState({display: result.data});
        });
    
    }

   

    imageChange = (e)=>{
    
        this.setState({
            selectedFile: e.target.files[0]
        });
        
    }

    addVariation = (e)=>{
        e.preventDefault();

        let fd = new FormData();
        fd.append('prod_id',this.state.display.prod_id);
        fd.append('variation_name',this.state.var_name);
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name); 
       axios.post('/api/admin/variation', fd,{
           headers: {'Content-Type': 'multipart/form-data'}
       })
       .then(result =>{
         if(result.data === 'done'){
            this.setState({dbRes: 'New variation added'});
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
        const {display,dbRes} = this.state;
        return(
            <React.Fragment>

            <AdminNavigator />
            
            <section id="adminBody" className="adminBody">

              <div className="container-sm">
              <div className=" col-sm-6 col-lg-6 mx-auto my-3">

                <div className="form-container">
                
               {dbRes ? <div className="alert alert-success text-center">{dbRes}</div>: null}
                <h5 className="text-center" >Add Variations for {display.prod_name}</h5>
                <div className="form-group">
                    

                        <label for="image" className="form-control">Variation Image</label>
                        <input type="file" name="file" id="prodImg" onChange={this.imageChange} required/>

                        <label for="productName" className="form-control">Variation Name</label>
                        <input type="text"  name="var_name" id="prod_name" className="form-control" onChange={this.handleChange} required/>
                        <br/>
                        <br/>
                        <button className="btn btn-lg bg-dark my-3 text-light form-control " onClick={this.addVariation}>addVariation</button>

                   
                </div>
              </div>
            </div>
            </div>
            </section>

            

            </React.Fragment>
        );
    }




}
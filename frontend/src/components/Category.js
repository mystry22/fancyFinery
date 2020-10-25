import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navigator from './Navigator';
import Footer from './footer';




export default class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prod : [],
            ip : '',
            category: ''
            
			
        }

    }

    

    componentDidMount =() =>{
        document.title = "Fancyfinery | Category";
        const id = this.props.match.params.id;
        const sub = id.substr(3);
        this.setState({category: sub});
        
        axios.get('/getViaCategory/'+id)
        .then(result =>{
            this.setState({prod: result.data});
            
			
        });
        this.getIp();
        
    }
    
   
    getIp = async () =>{
       await axios.get('/api/ip/getclientsIp')
        .then(response =>{
            this.setState({ip: response.data})
        });
    }
    
    tryIt = () =>{
        if(this.state.prod === 'undefined'
                        || this.state.prod === null
                        || this.state.prod.length === null
                        || this.state.prod.length === 0
        ){
            return(
            
            <div className="container">
                  <div className="row">
                     <div className="col-sm-8 col-lg-4 mx-auto text-center text-capitalize">
                     <h2 style={{margin: 'auto'}}>Sorry No Product For This Category Yet</h2>
            
                       </div>
               </div>
            </div>);
            
        }else{
            return (
                <section className="Products">
<div className="container">
    <div className="row">
        <div className="col-sm-8 col-lg-4 mx-auto text-center text-capitalize">
            <h2 className="featured">{this.state.category} Products</h2>
            
        </div>
    </div>

    <div className="row">
        {this.state.prod.map(prod =>
        <div className="col-sm-8 col-lg-4 mx-auto my-3"key={prod.prod_id}>
            <div className="card">
                <div className="img-container">
                    <Link to={"/product/:id"+prod.prod_id}><img src={"/image/"+prod.image_name} className="card-img-top" /></Link>
                </div>	
                <div className="card-body">
                    <div className="card-text d-flex justify-content-between">
                        <Link to={"/product/:id"+prod.prod_id}><h4>{prod.prod_name}</h4></Link>
                        <h4>#{prod.curr_price}</h4>

                    </div>
                </div>
            </div>

            
        </div>	
        )}
        
    </div>
</div>

</section>
            );
        }
    }
	
    render(){

        return(
            <React.Fragment>
            <Navigator />
            <br/>
            <br/>
            <br/>
            <hr/>
            {this.tryIt()}
            
	         <hr/>
            <Footer />
            </React.Fragment>
        );
    }
}
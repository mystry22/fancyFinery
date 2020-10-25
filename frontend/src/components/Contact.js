import React from 'react';
import Navigator from './Navigator';
import Footer from './footer';
import axios from 'axios';



const emailRegex = RegExp('@.');
export default class Contact extends React.Component{

    constructor(){
        super();
        this.state = {
            full_name: '',
            email: '',
            subject: '',
            msg: '',
            backEndError: '',
           
            
        }
    }
    
    componentDidMount = ()=>{
		document.title = "Fancyfinery | Contact";
	}
   handleChange = (e)=>{
       e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
   }
   contactUs = (e)=>{
       e.preventDefault();
    
     let fd = new FormData();
     fd.append('fullname',this.state.full_name);
     fd.append('email',this.state.email);
     fd.append('subject',this.state.subject);
     fd.append('message',this.state.msg);

       axios.post('/mailMe',fd)
       .then(response =>{
           if(response.data === 'sent'){
               
               this.setState({backEndError: 'Thank you for contacting us someone will get back to you soon'});
               
           }else{
            this.setState({backEndError: response.data})
           }
       })
   
    
   }



    
    render(){
        const {backEndError} = this.state;
        return(
            
            <React.Fragment>
                
           
           

	
	<Navigator />



	<section >

		<div className="container">
			

			<div className="row">
				<div className="col-sm-4 col-md-6 mx-auto">
                    <div className="form-container">
                        <h2 className="text-center">Contact</h2>
                    {backEndError ?<div><span className="alert alert-success mx-3 my-3">{backEndError}</span></div>: null }
                    <form className="form" onSubmit={this.contactUs}>
                        
                        <label for="full_name">Full Name <span style={{color:'red'}}>*</span></label>
                        <input type="text" name="full_name" className="form-control" defaultValue={this.state.full_name} required onChange={this.handleChange} />
                        <label for="email">Email <span style={{color:'red'}}>*</span></label>
                        <input type="email" name="email" className="form-control" defaultValue={this.state.email}  required onChange={this.handleChange} />
                        <label for="subject">Subject <span style={{color:'red'}}>*</span></label>
                        <input type="text" name="subject" className="form-control" defaultValue={this.state.subject}  required onChange={this.handleChange} />
                        <label for="message">Message <span style={{color:'red'}}>*</span></label>
                        <textarea name="msg" className="form-control" defaultValue={this.state.msg}  required onChange={this.handleChange}></textarea>
                        <button className="btn btn-lg bg-dark my-3 text-light form-control">SendMessage</button>
                    </form>
                   
					</div>
				</div>	
				
				
			</div>

            
		</div>
            
	</section>
		

	<Footer/>
    </React.Fragment> 
        );
    }
}
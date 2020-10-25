import React from 'react';
import {Link} from 'react-router-dom';
import Navigator from './Navigator';
import Footer from './footer';
import axios from 'axios';



const emailRegex = RegExp('@.');
export default class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            backEndError: '',
            isValid: ''
            
        }
    }
    
    componentDidMount = ()=>{
		document.title = "Fancyfinery | Login";
	}
    handleUsernameChange =(e)=>{
       e.preventDefault();
       this.setState({
           [e.target.name] : e.target.value
       })
       let usernameError = "";
       let isValid = "";
      
     if(this.state.username.length < 5){
        usernameError = "Username must not be less than 6 characters";
        isValid = 'false';
     }else{
        usernameError = '';
        isValid = 'true';
     }
    
     
     this.setState({usernameError,isValid});
    
     
   }

   handlePasswordChange = (e) =>{
    e.preventDefault();
    this.setState({
        [e.target.name] : e.target.value
    })
    let passwordError = "";
    let isValid = "";  

    if(this.state.password.length < 5){
        passwordError = "Password must not be less than 6 characters";
        isValid = 'false';
     }else{
        passwordError = '';
        isValid = 'true';
     }

     this.setState({passwordError,isValid});

   }

   loginUser = (e)=>{
       e.preventDefault();
       let {isValid} = this.state;
       
    if(isValid === 'true'){
       const data ={
           user : this.state.username,
           pass : this.state.password
       };
       

       axios.post('/login',data)
       .then(response =>{
           if(response.data === 'unauthorised'){
               
               this.setState({backEndError: 'Invalid Username Or Password'});
           }else{
            let token = response.data;
            localStorage.setItem('user',token);
            
            let isRedirect = localStorage.getItem('url');
            if(isRedirect){
                let redirect = '/delivery';
                window.location = redirect;
                localStorage.removeItem('url');
            }else{
                let redirect = '/';
                window.location = redirect;
            }
           }
       })
    }else{
        alert(isValid);
    }
    
   }



    
    render(){
        const {usernameError,passwordError,username,password,backEndError} = this.state;
        return(
            <React.Fragment>
                
           
           

	
	<Navigator />



	<section >
		<div className="container">
			

			<div className="row">
				<div className="col-sm-4 col-lg-4 mx-auto my-3">
                    <div className="form-container">
                        <h2 className="text-center">Login</h2>
                    <div><span style={{color:'red'}}>{backEndError}</span></div>
                    <form className="form" onSubmit={this.loginUser}>
                        
                        
                        <div className="form-in">
                            <label >Username:</label>
                            <input type="text" name="username" className="form-control my-3 "  onChange={this.handleUsernameChange} />
                            {usernameError  ? <span style={{color:'red'}}>{usernameError}</span> : null}
                        </div>
                        <div className="form-in">
                            <label >Password:</label>
                            <input type="password" name="password" className="form-control my-3 "  onChange={this.handlePasswordChange}  />
                            {passwordError  ? <span style={{color:'red'}}>{passwordError}</span> : null}
                        </div>
                        
                        <div className="form-in">
                            
                            <button className="btn btn-lg bg-dark my-3 text-light form-control">Login</button>
                            <div>
                                <a href="/register"  style={{textDecoration: 'none'}} className="text-success">Register</a>
                            </div>
                        </div>
                        
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
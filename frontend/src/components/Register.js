import React from 'react';
import {Link} from 'react-router-dom';
import Navigator from './Navigator';
import Footer from './footer';
import Slide from './slide';
import axios from 'axios';


const validEmail = RegExp('.@');
export default class Register extends React.Component{

    constructor(){
        super();
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            email: '',
            address: '',
            username: '',
            password: '',
            firstNameError: '',
            lastNameError: '',
            phoneError: '',
            emailError: '',
            userNameError: '',
            passwordError: ''

        }
    }
    componentDidMount = ()=>{
		document.title = "Fancyfinery | Register";
	}
    
    registerNewUser = (e) =>{
        e.preventDefault();
        const data ={
            fname : this.state.fname,
            lname: this.state.lname,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            username: this.state.username,
            password: this.state.password

        };

        axios.post('/register',data)
        .then(resp =>{
            if(resp.data === 'user exist'){
                alert('user exist');
            }else{
                const token = resp.data;
                localStorage.setItem('user',token);

                //chekck if user was coming from delivery page
                const url = localStorage.getItem('url');
                if(url){
                    const redirect = '/delivery';
                    window.location = redirect; 
                    localStorage.removeItem('url');
                }else{
                    let redirect = '/';
                window.location = redirect;
                }

                
            }
        });
    }
    firstNameValidation = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
        let firstNameError = "";
        let isValid = "";  
    
        if(this.state.fname.length < 2){
            firstNameError = "Firstname must not be less than 3 characters";
            isValid = 'false';
         }else{
            firstNameError = '';
            isValid = 'true';
         }
    
         this.setState({firstNameError,isValid});
    
       }
    
    lastNameValidation = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
        let lastNameError = "";
        let isValid = "";  
    
        if(this.state.lname.length < 2){
            lastNameError = "Lastname must not be less than 3 characters";
            isValid = 'false';
         }else{
            lastNameError = '';
            isValid = 'true';
         }
    
         this.setState({lastNameError,isValid});
    
       }
    phoneValidation = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
        let phoneError = "";
        let isValid = "";  
    
        if(this.state.phone.length > 7){

            if(typeof(this.state.phone === 'number') ){
                phoneError = '';
                isValid = 'true';
            }else{
                phoneError = "Please enter a valid phone number";
                isValid = 'false';
            }
         }else {
            phoneError = "Please enter a valid phone number";
            isValid = 'false';
         }
         
    
         this.setState({phoneError,isValid});
    
       }
    emailValidation = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
        let emailError = "";
        let isValid = "";  
    
        if(this.state.email.length >= 8){
            if(validEmail.test(this.state.email)){
                emailError = '';
                isValid = 'true';
            }else{
                emailError = 'Please enter a valid Email Address';
                isValid = 'false';
            }
         }else{
            emailError = 'Please enter a valid Email Address';
            isValid = 'false';
         }

        


         this.setState({emailError,isValid});
    
       }

    handleUsernameChange =(e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });

        let userNameError = '';
        let isValid = '';

        if(this.state.username.length < 5){
            userNameError = 'Username must not be less than 6 characters';
            isValid = 'false';
        }else{
            userNameError = '';
            isValid = 'true';
        }

        this.setState({userNameError,isValid});
    }

    handlePasswordChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });

        let passwordError = '';
        let isValid = '';

        if(this.state.password.length < 5){
            passwordError = 'Password must not be less than 6 characters';
            isValid = 'false';
        }else{
            passwordError = '';
            isValid = 'true';
        }

        this.setState({passwordError,isValid});
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    

    
    render(){
        const{firstNameError,lastNameError,phoneError,emailError,
            userNameError,passwordError} = this.state;
        return(
            <React.Fragment>
                
                <Navigator />
	
	<section >
		<div className="container">
			

			<div className="row">
				
				<div className="col-sm-6 col-lg-6 mx-auto my-3">
                   
                    <div className="form-container-for-others">
                        <h5 className="text-center" >Register</h5>
                    <form className="form" onSubmit={this.registerNewUser}>
                        <div className="form-in">
                            <input type="text" name="fname" className="form-control" placeholder="First Name" onChange={this.firstNameValidation} 
                             required/>
                        </div>
                        {firstNameError  ? <span style={{color:'red'}}>{firstNameError}</span> : null}

                        <div className="form-in">
                            
                            <input type="text" name="lname" className="form-control my-3 "placeholder="Last Name" onChange={this.lastNameValidation} required/>
                        </div>
                        {lastNameError  ? <span style={{color:'red'}} className="mx-3">{lastNameError}</span> : null}

                        <div className="form-in">
                            
                            <input type="text" name="phone" className="form-control my-3 " placeholder="Phone" onChange={this.phoneValidation} required/>
                        </div>
                        {phoneError  ? <span style={{color:'red'}}>{phoneError}</span> : null}

                        <div className="form-in">
                            
                            <input type="text" name="email" className="form-control my-3 " placeholder="E-mail" onChange={this.emailValidation}/>
                        </div>
                        {emailError  ? <span style={{color:'red'}}>{emailError}</span> : null}

                        <div className="form-in">
                            
                            <input type="text" name="address" className="form-control my-3 "placeholder="Address" onChange={this.handleChange}  />
                        </div>
                        <div className="form-in">
                            
                            <input type="text" name="username" className="form-control my-3 " placeholder="UserName" onChange={this.handleUsernameChange} required/>
                        </div>
                        {userNameError  ? <span style={{color:'red'}}>{userNameError}</span> : null}
                        <div className="form-in">
                           <input type="password" name="password" className="form-control my-3 " placeholder="Password" onChange={this.handlePasswordChange} required/>
                        </div>
                        {passwordError  ? <span style={{color:'red'}}>{passwordError}</span> : null}
                        
                        <div className="form-in">
                            
                            <button className="btn btn-lg bg-dark my-3 text-light form-control">Register</button>
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
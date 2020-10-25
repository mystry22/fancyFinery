import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


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
        document.title = "Fancyfinery | Admin Admin Login";
        const user = localStorage.getItem('admin');
        if(user){
            const url = '/adminhome';
            window.location = url;
        }
    }
    handleUsernameChange =(e)=>{
       e.preventDefault();
       this.setState({
           [e.target.name] : e.target.value
       })
       let usernameError = "";
       let isValid = "";
      
     if(this.state.username.length < 4){
        usernameError = "Username must not be less than 5 characters";
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

    if(this.state.password.length < 4){
        passwordError = "Password must not be less than 5 characters";
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
       

       axios.post('api/admin/login',data)
       .then(response =>{
           if(response.data === 'Invalid username or password'){
            this.setState({backEndError: 'Invalid Username Or Password'});
           }else{
               localStorage.setItem('admin',response.data);
               let redirect = '/adminhome';
               window.location = redirect;
           }
       })
    }else{
        
    }
    
   }



    
    render(){
        const {usernameError,passwordError,username,password,backEndError} = this.state;
        return(
            <React.Fragment>

	<section >
		<div className="container">
			

			<div className="row">
				<div className="col-sm-4 col-lg-4 mx-auto my-3">
                    <div className="form-container">
                        <h2 className="text-center">AdminLogin</h2>
                    <span style={{color:'red'}} className=" mx-3">{backEndError}</span>
                    <form className="form" onSubmit={this.loginUser} >
                        
                        
                        <div className="form-in">
                            <label className="form-control">Username:</label>
                            <input type="text" name="username" className="form-control my-3 "  onChange={this.handleUsernameChange} />
                            {usernameError  ? <span style={{color:'red'}}>{usernameError}</span> : null}
                        </div>
                        <div className="form-in">
                            <label className="form-control">Password:</label>
                            <input type="password" name="password" className="form-control my-3 "  onChange={this.handlePasswordChange}  />
                            {passwordError  ? <span style={{color:'red'}}>{passwordError}</span> : null}
                        </div>
                        
                        <div className="form-in">
                            
                            <button className="btn btn-lg bg-dark my-3 text-light form-control ">Login</button>
                        </div>
                        
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
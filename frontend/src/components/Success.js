import React from 'react';


export default class Success extends React.Component{

	componentDidMount = ()=>{
		document.title = "Fancyfinery | Success";
		this.doRedirection();
	}

	doRedirection = ()=>{
		let red = setTimeout(() => {
			window.location = '/';
			window.clearTimeout(red);
		}, 5000);
		

	}

	render(){
		return(
			<React.Fragment>
                
				<div className="container">
					<div className="row">
						<div className="col-xs-4 col-sm-8 col-lg-8 mx-auto my-3">
						<br/>
						<br/>
						<br/>
							
                        <div className="jumbotron text-center">
                            <h1 className="display-3">Thank You!</h1>
                            <p className="lead"><strong>Delivery within Lagos may take 3 to 5 working days</strong> and you can reach any of our agents on 234 80 6322 5408 for custom delivery options.</p>
                            <hr/>
                            <p>
                                Having trouble? <a href="/contact">Contact us</a>
                            </p>
                            <p className="lead">
                                <h4>You will be automatically redirected homepage</h4>
                            </p>
                        </div>
							
						</div>
					</div>

				</div>
				
			</React.Fragment>
		);
	}
}
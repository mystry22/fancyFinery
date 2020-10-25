import React from 'react';

export default class Footer extends React.Component{
    render(){
        return(
            
            
            <footer className="footer">
            
                <div className="row text-center">
                    <div className="footer-link col-md-4">
                    <div className="address">
                    <h5 className="text-success">Lagos Address</h5>
                    <div>
                        <p className="text-light">203 Masha drive Aguda Surulere</p>
                    </div>
                </div>

                <div className="phone-line">
                   <h5 className="text-success">Phone </h5>
                   <p  className="text-light">234 80 6322 5408</p>
                </div>
                    </div>
                    <div className="copyright col-md-4">
                        <p className="copy text-success">copyright Fancyfinery 2020</p>
                    </div>
                    <div className="brand-logo col-md-4">
                        <img src="/images/ff2.jpg" />
                    </div>
                </div>
              
        </footer>
        
        );
    }
}
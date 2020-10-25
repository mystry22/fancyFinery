displayPost = (post) =>{
    if(!this.props.post.length) return null;
    
    return post.map((post, index) =>
        
           
                <li className="product" key={this.props.post.prod_id}>
                    <input type="hidden" name="prod_id" value={this.props.post.prod_id} ref={input=>this.prod_id=input}></input>
                <Link to={"/product/id"+this.props.post.prod_id}><img className="product-image" src={'/image/'+ this.props.post.image_name} alt="Product"></img></Link>
                <div className="product-name">
                    <Link to={"/product/id"+this.props.post.prod_id }  >{this.props.post.prod_name}</Link>
                </div>
                <div className="product-description">{this.props.post.description}</div>
                <div className="product-price">#{this.props.post.curr_price}</div>
                <div className="product-button"><button onClick={this.getProdDetails}>View Product</button></div>
  
                </li>
  <Route path="/product/:id" exact={true} component = {ProductDetails} ></Route>


  <ul className="products">
                 {this.props.post.map((post, index) =>
        
           
        <li className="product" key={this.props.post.prod_id}>
            <input type="hidden" name="prod_id" value={this.props.post.prod_id} ref={input=>this.prod_id=input}></input>
        <Link to={"/product/id"+this.props.post.prod_id}><img className="product-image" src={'/image/'+ this.props.post.image_name} alt="Product"></img></Link>
        <div className="product-name">
            <Link to={"/product/id"+this.props.post.prod_id }  >{this.props.post.prod_name}</Link>
        </div>
        <div className="product-description">{this.props.post.description}</div>
        <div className="product-price">#{this.props.post.curr_price}</div>
        <div className="product-button"><button onClick={this.getProdDetails}>View Product</button></div>

        </li>)
        }
                        
    </ul>
            
            
        
    );
    
  }

  
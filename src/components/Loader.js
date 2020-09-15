import React, { Component } from 'react';

/* Responsible for lazy loading the images */

class Loader extends Component {
    
    constructor(props){
        super(props);
        this.props = props;
        this.observer = null;
        this.loader = React.createRef();
    }
    
    state = {
        numberOfPics: 30
        
    }

    componentDidMount(){
        
        const that = this;
        this.observer = new IntersectionObserver(function(entries){
            
            that.props.loadPics();
            
        });

        this.observer.observe(this.loader.current);
        
    }
        
    
    render(){
                
        
        return(
            
            <div ref={this.loader} style={{height:"100px"}} id="wrapper">
            </div>
        )    
        
    }
}

export default Loader;

import React, { Component } from 'react';

/* Allows full size display of image clicked */
class Display extends Component {

	displayStyles = ()=>{
		return {
			display: this.props.display,
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			position: "fixed",
			top: 0,
			bottom: 0,
			top: 0,
			left: 0,
			right: 0,
			margin: "auto",
			backgroundColor: "rgba(0, 0, 0, 0.5)"
		}
		
	}
	
    render(){
		
        return(
            
            <div style={this.displayStyles()} id="display" onClick={this.props.closeDisplay}>
            <div>
            	
            	<img style={{display:"block", maxWidth:"80vw", maxHeight: "80vh"}} src={this.props.src} alt=""/>
            	<div style={{backgroundColor: "#b6d2d9", textAlign: "center"}}>
            		<span>{this.props.width}x{this.props.height}</span>
				            		
            	</div>
            	
            </div>
            </div>
        )    
        
    }
}

export default Display;

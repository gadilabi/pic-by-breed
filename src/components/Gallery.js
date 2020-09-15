import React, { Component } from 'react';

class Gallery extends Component {
    
    state = {
        imageList: "",
        numberOfPics: 30
        
    }

    getWrapperStyle(){
        
        return {
            
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridAutoRows: "150px",
            gridGap: "20px",
            margin: "50px 100px"
            
        }
        
    }

    getImgStyle(){
        
        return{
            width:"100%",
            objectFit: "cover",
            maxHeight: "100%",
			cursor: "pointer"
            
        }
        
    }
        
    
    render(){
        
        const imageLinkList = this.props.imageList.slice(0, this.props.numberOfPics);

        const imageList = imageLinkList.map((link, index)=>{
            return(
                <img key={index} style={this.getImgStyle()} src={`${link}`} onClick={this.props.displayImage} />
                
            )
            
        });
        
        
        return(
            
            <div id="wrapper" style={this.getWrapperStyle()}>
                {imageList}
            </div>
        )    
        
    }
}

export default Gallery;

import React, { Component } from 'react';
import AutoComplete from './components/AutoComplete.js';
import Gallery from './components/Gallery.js';
import Loader from './components/Loader.js';
import Display from './components/Display.js';
import "./App.css";

class App extends Component {
    
    state = {
        imageList: [],
        numberOfPics: 30,
		imageDisplay: 'none',
        imageDisplayed: null,
		imageDisplayedWidth: null,
		imageDisplayedHeight: null,
    }
    
    search = async (value)=>{
        const res = await fetch(`https://dog.ceo/api/breed/${value}/images`);
        const imageList = await res.json();
        this.setState({
            imageList: imageList.message,
            numberOfPics: 30
        });
    }
    
    loadPics = ()=>{
        this.setState({
            numberOfPics: this.state.numberOfPics + 30
        })
        
    }
	
	displayImage = (e)=>{
		
		this.setState({
			imageDisplay: 'flex',
			imageDisplayed: e.target.src,
            imageDisplayedWidth: e.target.naturalWidth,
			imageDisplayedHeight: e.target.naturalHeight,
			
		});
		
	}
	
	closeDisplay = (e)=>{
		
		if(e.target.id !== 'display')
			return;
		
		this.setState({
			imageDisplay: 'none'
			
		});
	}
    
    render(){
        return(
            
            <div>
                <AutoComplete search={this.search}></AutoComplete>
                <Gallery numberOfPics={this.state.numberOfPics} imageList={this.state.imageList} displayImage={this.displayImage}></Gallery>
                <Loader loadPics={this.loadPics}></Loader>
                <Display closeDisplay={this.closeDisplay} width={this.state.imageDisplayedWidth} height={this.state.imageDisplayedHeight} display={this.state.imageDisplay} src={this.state.imageDisplayed}></Display>
            </div>
        )    
        
    }
}

export default App;

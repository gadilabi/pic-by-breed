import React, { Component } from 'react';
import AutoComplete from './components/AutoComplete.js';
import Gallery from './components/Gallery.js';
import Loader from './components/Loader.js';
import "./App.css";

class App extends Component {
    
    state = {
        imageList: [],
        numberOfPics: 30
        
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
    
    
    render(){
        return(
            
            <div>
                <AutoComplete search={this.search}></AutoComplete>
                <Gallery numberOfPics={this.state.numberOfPics} imageList={this.state.imageList}></Gallery>
                <Loader loadPics={this.loadPics}></Loader>
            </div>
        )    
        
    }
}

export default App;

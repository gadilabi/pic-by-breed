import React, { Component } from 'react';
class AutoComplete extends Component {
    
    constructor(props){
        super(props);
        
        this.dropdownRef = React.createRef();
        this.selectedRef = React.createRef();
    }
    
    state = {
        allValues: [],
        possibleValues: [],
        value: "",
        selectedIndex: -1,
        selectedValue: null,
        open: false,
        bottom: false,
        top: true
    
    }
    
    
    async fetchBreedList(){
        const res= await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await res.json();
        
        this.setState({
            allValues: Object.keys(data.message),
            
        });
        
        console.log(this.state.allValues);
        
    }

    componentDidMount(){
        //Fetch the list of breeds using the api
        this.fetchBreedList();
        
        

    }

    handleChange = (e)=>{
        console.log(this);
        const inputValue = e.target.value;
        const possibleValues = this.state.allValues.filter((value)=>value.startsWith(inputValue));
        
        this.setState({
            possibleValues: possibleValues,
            value: inputValue,
            selectedIndex: -1,
            selectedValue: null,
            open: true
        });
        
    }
    
    handleSearch = (e)=>{
        
        this.props.search(this.state.value);
        
    }
        
    handleKeyDown = (e)=>{
        
        console.log(this.dropdownRef.current);
        console.log(this.selectedRef.current);
        
        if(e.key === "ArrowDown"){
            
            if(this.state.selectedIndex === (this.state.possibleValues.length -1))
                return;
            
            
            
            const newIndex = this.state.selectedIndex + 1;
            const newValue = this.state.possibleValues[newIndex];
            this.setState({
                selectedIndex: newIndex,
                selectedValue: newValue
                
            });
            
        }
        
        if(e.key === "ArrowUp"){
            if(this.state.selectedIndex === 0)
                return;

            const newIndex = this.state.selectedIndex -1;
            const newValue = this.state.possibleValues[newIndex];
            this.setState({
                selectedIndex: newIndex,
                selectedValue: newValue
                
            });
            
        }
        
        if(e.key === "Enter"){
            
            const selectedValue = this.state.selectedValue;
            
            this.setState({
                value: selectedValue,
                open: false
                
            })
            
        }
        
        
    }
    
    getListStyle(){
        
        if(this.state.open){
            
            return {
                display: "block",
                width: "200px",
                maxHeight: "200px",
                boxSizing: "border-box",
                overflow: "auto",
                backgroundColor: "white"

            }
            
        }else{
            
            return {

                display: "none",


            }
            
        }
            
        
        
    }

    getButtonStyle(){
        
        return {
            all: "unset",
            display: "grid",
            placeItems: "center",
            backgroundColor: "blue",
            height: "35px",
            width: "35px",
            boxSizing: "35px"
            
            
        }
        
    }

    getImgStyle(){
        
        return {
            
            width: "15px",
            height: "15px",

            
        }
        
    }

    getInputStyle(){
        
        return {
            boxSizing: "border-box",
            height: "35px",
            width: "165px"
            
            
        }
        
    }

    getWrapperStyle(){
        
        return {
            
            display: "grid",
            placeItems: "center",
        }
        
    }

    getStyle(){
        return {
            display: "flex",
            
            
            
        }
        
    }

    handleScrolling = ()=>{
            
            if(this.index < 0)
                return;
            
            const containerTop = this.dropdownRef.current.getBoundingClientRect().top;
            const containerHeight = this.dropdownRef.current.getBoundingClientRect().height;
            
            const optionTop = this.selectedRef.current.getBoundingClientRect().top;
            const optionHeight = this.selectedRef.current.getBoundingClientRect().height;
            
            const relativeTop = optionTop - containerTop;
            
            if(relativeTop < optionHeight ){
                this.dropdownRef.current.scrollTop -= 2*optionHeight;
                
            }
        
            if((relativeTop+2*optionHeight) > containerHeight){
                this.dropdownRef.current.scrollTop += 2*optionHeight;
            
            }
        
            

        
    }
    
    componentDidUpdate(){
        if(this.selectedRef.current !== null && this.dropdownRef.current !== null)
            this.handleScrolling();
        
        
    }

    handleClick = (e)=>{
            
        this.setState({
            value: e.target.dataset.value,
            open: false

        })

        
        
    }
    
    
    render(){
        
        
        const possibleValues = this.state.possibleValues.map((value)=>{
            
            if(value === this.state.selectedValue){
                return(
                    <div onClick={this.handleClick} key={value} data-value={value} ref={this.selectedRef} className="option selected">{value}</div>
                )
                
                
            }
            
            return(
                <div onClick={this.handleClick} key={value} data-value={value}  className="option">{value}</div>
            )
            
        });
        
        
        return(
            <div style={this.getWrapperStyle()}>
               <div>
                <h1>
                
                <span >Pic BY Breed</span>
                
                <img style={{height:"50px", width:"50px", marginLeft:"10px"}} src={require(`../images/paw.svg`)} alt=""/>
                </h1>
                   
               </div>
               
               <div style={{width:"200px",}}>
                   
                    <div style={this.getStyle()}>
                        <input value={this.state.value} style={this.getInputStyle()} placeholder="Enter Breed" onKeyDown={this.handleKeyDown} onChange={this.handleChange}/>
                        <button onClick={this.handleSearch} style={this.getButtonStyle()}>
                            <img style={this.getImgStyle()} src={require("../images/magnifying_glass.svg")} alt=""/>
                        </button>

                   </div>

                    <div ref={this.dropdownRef} style={this.getListStyle()} id="breed-list">
                        {possibleValues}
                    </div>
                   
               </div>
                
                
            </div>
            
        )    
        
    }
}

export default AutoComplete;


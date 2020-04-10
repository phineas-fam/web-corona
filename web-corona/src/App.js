import React from 'react';
import './App.css';


class Form extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      firsrQuestion : null,
      secondQuestion:null,
      thirdQuestion:null,
      showButton:null,
      isActive:false,
      squares: {},
    };
    }
  
    handleClick = (Event) => {
      const squares2 = this.state.squares;
      squares2[Event.target.name]=Event.target.value;
      console.log(squares2);
      this.setState({
        isActive: true,
        selectedOption: Event.target.value,
        squares:squares2,
      })
    }


  render (){
    
    return (
      
    <div className="App">
    
    <header className="App-header">
      <img  className="logo" src="https://img.icons8.com/bubbles/100/000000/todo-list.png"  alt="task icon" style={{marginBottom:" 3%"}} />
      <div className="heading">
      <div  style={{fontSize:"40px"}}><b> Covid-19 </b></div>
      <div  style={{fontSize:"30px"}}><b> Online Assessment</b></div>
      </div>
  
    <form>
    
    <div>   
        <h5> <b> Have you come into close contact with someone who has contracted COVID19 in the past days?</b></h5>

        <input id="Q1_Yes" className="radio-custom"  name="Q1" type="radio"  value="Yes"  onClick={()=>{this.setState({ firsrQuestion : true})}} onChange={this.handleClick}/>
        <label htmlFor="Q1_Yes" style={{fontSize:"14px"}} className="radio-custom-label">Yes</label>

        <input id="Q1_No" className="radio-custom" name="Q1" type="radio"  value="No"  onClick={()=>{this.setState({ firsrQuestion : true})}} onChange={this.handleClick} />
        <label htmlFor="Q1_No" style={{fontSize:"14px"}} className="radio-custom-label">No</label>
    </div>

    <div className={this.state.firsrQuestion===true ? "warning": "hide"} > 
        <h5> <b>Do you have difficulty when breathing ?</b></h5>
        <input id="Q2_Yes" className="radio-custom" name="Q2"  type="radio"  value="Yes" onClick={()=>{this.setState({ secondQuestion : true})}} onChange={this.handleClick} />
        <label htmlFor="Q2_Yes" style={{fontSize:"14px"}} className="radio-custom-label">Yes</label>

        <input id="Q2_No" className="radio-custom" type="radio" name="Q2" value="No" onClick={()=>{this.setState({ secondQuestion : true})}} onChange={this.handleClick} />
        <label htmlFor="Q2_No" style={{fontSize:"14px"}} className="radio-custom-label">No</label>
     </div>  


    <div className={this.state.secondQuestion===true ? "warning": "hide"} > 
        <h5> <b>Do you have fever or a dry cough  ?</b></h5>
        <input id="Q3_Yes" className="radio-custom" name="Q3"  type="radio"  value="Yes" onClick={()=>{this.setState({ thirdQuestion : true})}} onChange={this.handleClick} />
        <label htmlFor="Q3_Yes" style={{fontSize:"14px"}} className="radio-custom-label">Yes</label>

        <input id="Q3_No" className="radio-custom" type="radio" name="Q3" value="No" onClick={()=>{this.setState({ thirdQuestion : true})}} onChange={this.handleClick} />
        <label htmlFor="Q3_No" style={{fontSize:"14px"}} className="radio-custom-label">No</label>
     </div> 


    <div className={this.state.thirdQuestion===true ? "warning": "hide"} > 
        <h5> <b>Do you have aches , pains or a runny nose ?</b></h5>
        <input id="Q4_Yes" className="radio-custom" name="Q4"  type="radio"  value="Yes" onClick={()=>{this.setState({ showButton : true})}} onChange={this.handleClick} />
        <label htmlFor="Q4_Yes" style={{fontSize:"14px"}} className="radio-custom-label">Yes</label>

        <input id="Q4_No" className="radio-custom" type="radio" name="Q4" value="No" onClick={()=>{this.setState({ showButton : true})}} onChange={this.handleClick} />
        <label htmlFor="Q4_No" style={{fontSize:"14px"}} className="radio-custom-label">No</label>
     </div> 
     <div className={this.state.showButton===true ? "warning": "hide"}>
       <button className="btn"> Submit </button>
     </div>
  </form>
  
    </header>
  </div>

    );
}
}



export default Form;

import React from "react";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: {},
      listt: [{"id":0,"text":"Have you come into close contact with someone who has tested positive for COVID19 ?"},{"id":1,"text":"Do you have difficulty when breathing?"},{"id":2,"text":"Do you have fever or a dry cough ?"}],
      showNext:[true],
      index : 1
    };
  }

  handleClick = Event => {
    const squares2 = this.state.squares;
    const question = Event.target.name;
    const answer = Event.target.value;
    const showElemnts = this.state.showNext;
    //  showElemnts[0] will always be true 
    showElemnts[0]=true; 
    showElemnts[this.state.index]=true;
    const new_index =this.state.index + 1;
    console.log(new_index);
    squares2[question] = { question: question, text: answer };
    this.setState({
      squares: squares2,
      showNext:showElemnts,
      index : new_index
    });
  };

  // componentDidMount() {
  //   fetch("http://localhost:5000/questions/")
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("what the ");
  //       this.setState({ listt: data });
  //       //console.log(this.state.squares2)
       
  //     });
  //     //console.log(this.state.squares)
     
  // }

  chanh=()=>{
    const no =  this.state.no + 1
    console.log(no)
    this.setState({
      no: 2
    });

  }

  render() {

    //console.log("man ",this.state.listt);
    return (
      
      <div className="App">
        <header className="App-header">
          <img
            className="logo"
            src="https://img.icons8.com/bubbles/100/000000/todo-list.png"
            alt="task icon"
            style={{ marginBottom: " 3%" }}
          />
          <div className="heading">
            <div style={{ fontSize: "40px" }}>
              <b> Covid-19 </b>
            </div>
            <div style={{ fontSize: "30px" }}>
              <b> Online Survey </b>
            </div>
          </div>

        </header>

        <form>



          {this.state.listt.map(question => (
            // currently i used the id to hide but we'll  use the index in future
            <div key={question.id} className={this.state.showNext[question.id]===true ? "show" :"hide"}>
              <h2>
                <b>{question["text"]}</b>
              </h2>

              <input
                id={`${question["id"]}_Yes`}
                className="radio-custom"
                name={"azwindini"}
                type="radio"
                value="Yes"
                onClick={() => {
                  this.setState({ firstQuestion: true });
                }}
                onChange={this.handleClick}
              />
              <label
                htmlFor={`${question["id"]}_Yes`}
                style={{ fontSize: "14px" }}
                className="radio-custom-label"
              >
                Yes
              </label>

              <input
                id={`${question["id"]}_No`}
                className="radio-custom"
                name={question["id"]}
                type="radio"
                value="No"
                onClick={() => {
                  this.setState({ firstQuestion: true });
                }}
                onChange={this.handleClick}
              />
              <label
                htmlFor={`${question["id"]}_No`}
                style={{ fontSize: "14px" }}
                className="radio-custom-label"
              >
                No
              </label>
            </div>
          ))}
                  <div>
          <button
            className="btn"
            onClick={() => {
              onSubmit(this.state.squares);
            }}
          >
            {" "}
            Submit{" "}
          </button>
        </div>
        </form>

      </div>
    );
  }
}

const onSubmit = answersArray => {
  fetch("http://localhost:5000/answer", {
    method: "POST",
    body: JSON.stringify({
      answers: answersArray
    }),
    headers: { "Content-Type": "application/json" }
  });
};
export default Form;

 


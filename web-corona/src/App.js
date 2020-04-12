import React from "react";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      firstQuestion: null,
      secondQuestion: null,
      thirdQuestion: null,
      showButton: null,
      isActive: false,
      squares: {},
      listt: [
        {
          id: "Q1",
          text:
            "Have you come into close contact with someone who has tested positive for COVID19 ?"
        },
        {
          id: "Q2",
          text: "Do you have difficulty when breathing?"
        },
        {
          id: "Q3",
          text: "Do you have fever or a dry cough ?"
        },
        {
          id: "Q4",
          text: "Do you have aches , pains or a runny nose ?"
        }
      ]
    };
  }

  handleClick = Event => {
    const squares2 = this.state.squares;
    squares2[Event.target.name] = Event.target.value;
    this.setState({
      isActive: true,
      selectedOption: Event.target.value,
      squares: squares2
    });
  };

  render() {
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
              <b> Online Survey</b>
            </div>
          </div>

          <form>
            {this.state.listt.map(question => (
              <div>
                <h5>
                  <b>{question["text"]}</b>
                </h5>

                <input
                  id={`${question["id"]}_Yes`}
                  className="radio-custom"
                  name={question["id"]}
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
              <button className="btn"> Submit </button>
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default Form;

import React from "react";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: {},
      listt: [],
      showNext: [true],
      index: 0,
      shownQuestions: [],
    };
  }

  handleClick = (Event) => {
    const squares2 = this.state.squares;
    const question = Event.target.name;
    const answer = Event.target.value;
    const showElemnts = this.state.showNext;
    let new_index = this.state.index;
    let new_shown = this.state.shownQuestions;

    if (this.state.shownQuestions.indexOf(question) === -1) {
      new_shown[this.state.index] = question;
      new_index = this.state.index + 1;
      showElemnts[new_index] = true;
    }

    squares2[question] = { question: question, text: answer };

    this.setState({
      squares: squares2,
      showNext: showElemnts,
      index: new_index,
      shownQuestions: new_shown,
    });
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/questions`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ listt: data.questions });
      });
  }

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
              <b> Online Survey </b>
            </div>
          </div>
        </header>
        <form>
          {this.state.listt.map((question) => (
            <div
              key={question.id}
              className={
                this.state.showNext[this.state.listt.indexOf(question)] === true
                  ? "show"
                  : "hide"
              }
            >
              <h2>
                <b>{question["text"]}</b>
              </h2>

              <input
                id={`${question["id"]}_Yes`}
                className="radio-custom"
                name={question["id"]}
                type="radio"
                value="Yes"
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
        </form>
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
      </div>
    );
  }
}

const onSubmit = (answersArray) => {
  console.log(answersArray);
  fetch(`${process.env.REACT_APP_BACKEND_URL}/answers`, {
    method: "POST",
    body: JSON.stringify({
      answers: answersArray,
    }),
    headers: { "Content-Type": "application/json" },
  });
};
export default Form;

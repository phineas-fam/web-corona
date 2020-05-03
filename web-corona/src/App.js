import React from "react";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey_final_answers: {},
      survey_questions: [],
      ShowNextElement: [true],
      // we'll use the index to access each booalean on the ShowNextElment list
      index: 1,
      current_question: null,
    };
  }

  handleClick = (Event) => {
    // this will used to temporarily store answers
    const temp_answers = this.state.survey_final_answers;
    const question = Event.target.name;
    const answer = Event.target.value;
    temp_answers[question] = { question: question, text: answer };
    //  this will used for hiding elemts , each boolean determines if we should hide or not
    // if a boolean at position 0 is true then we'll show the question at position 0
    // if a boolean at position 1 is false then we'll hide the question at position 1
    const showElemnts = this.state.ShowNextElement;
    let new_index = this.state.index;
    //we'll only update the index when the user clicks on a different question
    if (
      this.state.current_question !== null &&
      this.state.current_question !== question
    ) {
      new_index = this.state.index + 1;
    }

    //we'll use the index to add each boolean on a specifix position
    showElemnts[new_index] = true;
    this.setState({
      survey_final_answers: temp_answers,
      ShowNextElement: showElemnts,
      index: new_index,
      current_question: question,
    });
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/questions`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ survey_questions: data.questions });
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
          {this.state.survey_questions.map((question) => (
            // current_questionly i used the id to hide but we'll  use the index
            <div
              key={question.id}
              className={
                this.state.ShowNextElement[
                  this.state.survey_questions.indexOf(question)
                ] === true
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
              onSubmit(this.state.survey_final_answers);
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
  fetch(`${process.env.REACT_APP_BACKEND_URL}/answer`, {
    method: "POST",
    body: JSON.stringify({
      answers: answersArray,
    }),
    headers: { "Content-Type": "application/json" },
  });
};
export default Form;

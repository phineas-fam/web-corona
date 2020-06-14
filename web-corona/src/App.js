import React from "react";
import NavBar from "./NavBar";
import Popup from "reactjs-popup";
import success from "./images/success.png";

import { Link } from "react-router-dom";
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
  error() {
    console.log("Unable to retrieve your location");
  }

  GetUserProvince = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(`https://mapit.code4sa.org/point/4326/${longitude},${latitude}`)
      .then((response) => response.json())
      .then((data) => {
        const Province_key = Object.keys(data)[0];
        const Province_name = data[Province_key]["name"];
        this.setState({
          Province: Province_name,
          Longitude: longitude,
          Latitude: latitude,
        });
      });
  };

  PopupPage = () => {
    return (
      <div className="App">
        <img
          className="logo"
          src={success}
          alt="success icon"
          style={{ marginBottom: " 3%" }}
        />

        <h4>Survey successfully completed {this.state.index} </h4>

        <Link to="/">
          <button
            className="btn"
            onClick={() => {
              onSubmit(this.state.survey_final_answers);
            }}
          >
            Okay
          </button>
        </Link>
      </div>
    );
  };

  handleClick = (Event) => {
    // this will used to temporarily store answers
    const temp_answers = this.state.survey_final_answers;

    console.log(temp_answers);
    const question = Event.target.name;
    const answer = Event.target.value;
    const question_name = "q" + question;
    temp_answers[question_name] = answer;

    if (this.state.index === 1) {
      temp_answers["latitude"] = this.state.Latitude;
      temp_answers["longitude"] = this.state.Longitude;
      temp_answers["province"] = this.state.Province;
    }
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/questions/`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ survey_questions: data.questions });
      });
    navigator.geolocation.getCurrentPosition(this.GetUserProvince, this.error);
  }

  render() {
    return (
      <div className="SurveyContainer">
        <NavBar />
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
                <b style={{ color: "#8fb24f" }}> Covid-19 </b>
              </div>
              <div style={{ fontSize: "30px" }}>
                <b style={{ color: "#8fb24f" }}> Online Survey </b>
              </div>
            </div>
          </header>

          <form>
            <h5>Province :{this.state.Province} </h5>
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
                <h3 style={{ color: "#8fb24f" }}>
                  <b>{question["text"]}</b>
                </h3>

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
            <Popup
              modal
              trigger={
                <button
                  className={
                    this.state.index === this.state.survey_questions.length
                      ? "btn"
                      : "btn"
                  }
                >
                  Submit
                </button>
              }
            >
              <div>{this.PopupPage()}</div>
            </Popup>
          </div>
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

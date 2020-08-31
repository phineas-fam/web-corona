import React from "react";
import NavBar from "./NavBar";
import Popup from "reactjs-popup";

import { Link } from "react-router-dom";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey_final_answers: {},
      weightTotal : 0,
      CurrentWeight : 0 ,
      survey_questions: [{ text: 'Sore throat', weight: 4 },{ text: 'Flu', weight: 2 },{ text: 'Struggle Breathing', weight: 6 },{ text: 'Headache', weight: 3 }],
      ShowNextElement: [true],
      index: 0,
      AnsweredQuestions: [],
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

        });
      });
  };

  PopupPage = () => {
    var SurveyweightTotal = 0
    let Risk
    let results 
    let riskcolor
    let Advice
    if(this.state.index === this.state.survey_questions.length){
      this.state.survey_questions.forEach(element => {
        SurveyweightTotal = SurveyweightTotal + element.weight
      
    });
//Convert the results to percentage
    results =  ((this.state.weightTotal/SurveyweightTotal)*100).toFixed(0)
   
    if (results < 50){
      Risk = results < 26 ? 'Very Low Risk' : 'Low Risk'
      riskcolor = Risk === 'Low Risk' ? 'orange' : 'Green'
      Advice = Risk === 'Low Risk' ? 'unlikely to have corona, keep wearing your mask' : 'No signs of corona, keep a good hygiene'
    }
    else{
      Risk = results < 75 ? 'Medium Risk' : 'High Risk'
      riskcolor = Risk === 'High Risk' ? 'Red' : 'Orange'
      Advice = Risk === 'Medium Risk' ? 'Observe the symptoms closely and see a doctor if get worse' : 'Please see a doctor immediately'

    }
    

  }

    return (
      <div className="App">

        <h4 style={{color:riskcolor}}>Results : {Risk}  </h4>
        <h5> {Advice}  </h5>

        <h6> Thank you for completing the survey  </h6>

        <Link to="/">
          <button
            className="btn"
            onClick={() => {
              onSubmit(this.state.survey_final_answers);
            }}
          >
            Close
          </button>
        </Link>
      </div>
    );
  };

  handleClick = (Event) => {

    const CurrentSurvey = this.state.survey_final_answers;
    const questionId = Event.target.name;
    const answer = Event.target.value;

    const question_name = "Q" + questionId;
    CurrentSurvey[question_name] = answer;
    CurrentSurvey["province"] = this.state.Province;


    let new_index = this.state.index;
    var newWeight = this.state.weightTotal
    let AddtoWeight;
    let MinusToWeight;

    if (
  
      this.state.AnsweredQuestions.indexOf(questionId) === -1
    ) {
      new_index = new_index + 1;
      AddtoWeight = this.state.weightTotal +  this.state.survey_questions[questionId-1].weight
      newWeight = answer==="Yes"? AddtoWeight : this.state.weightTotal 

    }
    else{

      // new_index = this.state.index + 1;
      AddtoWeight = this.state.weightTotal +  this.state.survey_questions[questionId-1].weight
      MinusToWeight = this.state.weightTotal -  this.state.survey_questions[questionId-1].weight
      newWeight = answer==="Yes"? AddtoWeight : MinusToWeight
    }


    var newAnsweredQuestions = this.state.AnsweredQuestions
    newAnsweredQuestions.push(questionId)

    const showElemnts = this.state.ShowNextElement;
    showElemnts[new_index] = true;
    this.setState({
      survey_final_answers: CurrentSurvey,
      ShowNextElement: showElemnts,
      index: new_index,
      weightTotal : newWeight,
      AnsweredQuestions: newAnsweredQuestions,
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
            <h5>Province : {this.state.Province} </h5>
            {this.state.survey_questions.map((question, index) => (
              // current_questionly i used the id to hide but we'll  use the index
              <div
                key={index}
                className={
                  this.state.ShowNextElement[
                    this.state.survey_questions.indexOf(question)
                  ] === true
                    ? "show"
                    : "hide"
                }
              >
                <h3 className="AppH3" >
                  <b>{question["text"]}</b>
                </h3>

                <input
                  id={`${index}_Yes`}
                  className="radio-custom"
                  name={index+1}
                  type="radio"
                  value="Yes"
                  onChange={this.handleClick}
                />
                <label
                  htmlFor={`${index}_Yes`}
                  style={{ fontSize: "14px" }}
                  className="radio-custom-label"
                >
                  Yes
                </label>

                <input
                  id={`${index}_No`}
                  className="radio-custom"
                  name={index+1}
                  type="radio"
                  value="No"
                  onChange={this.handleClick}
                />
                <label
                  htmlFor={`${index}_No`}
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

import React, { Component } from "react";
import NavBar from "./NavBar";
import doctors from "./images/heroes.jpg";

import "./Guidelines.css";

export default class Guidelines extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleClose = (element) => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="GuidelinesContainer">
        <NavBar />
        <img
          className="icon"
          src={doctors}
          alt="task icon"
          style={{ alignItems: "center" }}
        />
        <div className="header">
          <h2>
            <b style={{ color: "#8fb24f" }}>Covid-19 </b>
          </h2>
          <h4>Safety Guidelines</h4>
        </div>
        <div className="TipsSection">
          <h3 className="RedBorder">
            {" "}
            Wash your hands regurlaly with soap and water for at least 20
            seconds.You can also use a hand sanitizer with at least 60% alcohol.
          </h3>
          <h3 className="GreenBorder">
            {" "}
            Practice social distancing by keeping at least 6 feet away from
            others
          </h3>
          <h3 className="RedBorder">
            {" "}
            Clean and disinfect household surfaces daily and high-touch
            surfaces.( phones, remote controls, counters, etc.) frequently
          </h3>
          <h3 className="GreenBorder">
            {" "}
            Cover your mouth with a tissue or use a flexed elbow when coughing{" "}
          </h3>
          <h3 className="RedBorder">
            {" "}
            Stay home and Avoid social gatherings of more than 10 people.{" "}
          </h3>
          <h3 className="GreenBorder">
            Avoid touching your face with unwashed hands.
          </h3>
        </div>
      </div>
    );
  }
}

import React from "react";
import "./TipsPage.css";
import doctors from "./images/heroes.jpg";
import { Link } from "react-router-dom";

function TipsPage() {
  return (
    <div className="TipsPage" id="head">
      <h2> #StayAtHome </h2>
      <img
        className="icon"
        src={doctors}
        alt="task icon"
        style={{ alignItems: "center" }}
      />
      <div className="header2">
        <h1>
          <b>Covid-19 </b>
        </h1>

        <h4>Prevention Tips </h4>
      </div>
      <div className="Tips_section">
        <div className="Tips_div">
          <h3>
            {" "}
            Wash your hands regurlaly with soap and water for at least 20
            seconds.You can also use a hand sanitizer with at least 60% alcohol.
          </h3>
          <h3 className="green_border">
            {" "}
            Practice social distancing by keeping at least 6 feet away from
            others
          </h3>
          <h3>
            {" "}
            Clean and disinfect household surfaces daily and high-touch
            surfaces.( phones, remote controls, counters, etc.) frequently
          </h3>
          <h3 className="green_border">
            {" "}
            Cover your mouth with a tissue or use a flexed elbow when coughing{" "}
          </h3>
          <h3>
            {" "}
            Stay home and Avoid social gatherings of more than 10 people.{" "}
          </h3>
          <h3 className="green_border">
            Avoid touching your face with unwashed hands.
          </h3>
        </div>
      </div>

      <span>
        <Link to="/App">
          <button className="btn">Take Survey</button>
        </Link>
      </span>
    </div>
  );
}

export default TipsPage;

import { IoMdMenu, IoMdClose } from "react-icons/io";
import ResponsiveMenu from "react-responsive-navbar";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import "./NavBar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  //for responsive purposes
  showMenu = () => {
    this.setState({
      show: true,
    });
  };
  //Also for responsive purposes
  hideMenu = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <div className="NavBar">
        <div
          className={this.state.show === true ? "navbarResponsive" : "navbar"}
        >
          <ResponsiveMenu
            menuOpenButton={
              <IoMdMenu
                size={30}
                onClick={this.showMenu}
                style={{ marginLeft: 290, marginTop: 15 }}
              />
            }
            menuCloseButton={
              <IoMdClose
                size={30}
                onClick={this.hideMenu}
                style={{ marginLeft: 290, marginTop: 15 }}
              />
            }
            changeMenuOn="500px"
            largeMenuClassName="large-menu"
            smallMenuClassName="small-menu"
            menu={
              <div className="navContent">
                <ul>
                  <hr
                    className="Linebreaks"
                    color="white"
                    style={{ marginLeft: -40, height: 1 }}
                  />
                  <Link to="/">
                    <li>
                      <a href="javascript:void(0) " className="MainPage">
                        Home
                      </a>
                    </li>
                  </Link>

                  {/* <hr className="Linebreaks" color='white' style={{marginLeft:-40,height:1}}/> */}
                  <Link to="/App">
                    <li>
                      <a className="Survey">Survey</a>
                    </li>
                  </Link>
                  {/* <hr className="Linebreaks" color='white' style={{marginLeft:-40,height:1}}/> */}

                  <Link to="/Guidelines">
                    <li>
                      <a className="Guideline">Safety Guidelines</a>
                    </li>
                  </Link>
                </ul>
              </div>
            }
          />
        </div>
        <h2
          style={{
            position: "absolute",
            top: 0,
            color: "white",
            left: 20,
          }}
        >
          #StayAtHome
        </h2>
      </div>
    );
  }
}

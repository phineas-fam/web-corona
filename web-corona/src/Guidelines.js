import React, { Component } from 'react';
import ResponsiveMenu from 'react-responsive-navbar';
import { Link } from "react-router-dom";
import doctors from './images/heroes.jpg'

import { IoMdMenu,IoMdClose } from "react-icons/io";
import './Guidelines.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
          show:false,
    
        };}

        //for responsive purposes
        showMenu=()=>{
            this.setState({
                show: true
            })

        }
        //Also for responsive purposes        
        hideMenu=()=>{
            this.setState({
                show: false
            })
        }
        handleClose = (element) => {
            this.setState({open: false});
          }

        
    render() {
    return (
        <div className="GuidelinesContainer" >
            <div className={
                this.state.show ===true
                  ? "navbarResponsive"
                  : "navbar"
              } >
                <ResponsiveMenu
                menuOpenButton={<IoMdMenu size={30} onClick={this.showMenu} style={{marginLeft:290,marginTop:15}}/>}
                menuCloseButton={<IoMdClose size={30}  onClick={this.hideMenu} style={{marginLeft:290,marginTop:15}} />}
                changeMenuOn="500px"
                largeMenuClassName="large-menu"
                smallMenuClassName="small-menu"
                menu={
                    <div className="navContent">
                        <ul >
                        <hr className="Linebreaks" color='white' style={{marginLeft:-40,height:1}}/>
                            <Link to="/">
                                <li >
                                <a href="javascript:void(0)" >Home</a>
                                </li>
                            </Link>
                            
                            {/* <hr className="Linebreaks" color='white' style={{marginLeft:-40,height:1}}/> */}
                            <Link to="/App">
                                <li >
                                <a  >Survey</a>
                                </li>
                            </Link>
                            {/* <hr className="Linebreaks" color='white' style={{marginLeft:-40,height:1}}/> */}

                            <Link to="/Guidelines">
                            <li>
                            <a className="MainPage">Safety Guidelines</a>
                            </li>
                            </Link>
                        </ul> 
                    </div>}
                />
            </div>
            <h2 style={{
                position:'absolute',
                top:0,
                color:'white',
                left:20}}>

                #StayAtHome
            </h2>
            <img
                className="icon"
                src={doctors}
                alt="task icon"
                style={{ alignItems: "center" }}
            />
            <div className="header">
                <h2  >
                    <b style={{color:'#8fb24f'}}>Covid-19 </b>
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

            </div>);}}
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './Nvi.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import strategy from "./Plan";          
import farm from "../farm/Farm";

// import Contact from "../";
class Nvi extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="header">
            <li><NavLink to="/">AGRITREKK Planning</NavLink></li>
            <li><NavLink to="/locatefarm">AGRITREKK Locate Farm</NavLink ></li>
            <li><NavLink to="/realTimeMon">AGRITREKK Daily Coverage</NavLink ></li>
            <li><NavLink to="/realTimeMon.farmers">AGRITREKK Harvest Mon</NavLink></li>
            <li><NavLink to="/forcast">AGRITREKK Forecast</NavLink></li>
            <li><NavLink to="/officeLocator">AGRITREKK Asset Manager</NavLink></li>
            <li><NavLink to="/infrasStructureMon">AGRITREKK Infrastructure Mon</NavLink></li>
          </ul>  
          <div className="content">
           {/* <Route exact path="/" component={strategy}/>
           <Route  path="/locatefarm" component={farm}/>    */}
          </div>
        </div>
      </HashRouter> 
    );
  }
}
 
export default Nvi;


// react-scripts start
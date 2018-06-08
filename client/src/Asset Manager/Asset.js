import React, { Component } from "react";
import { GoogleApiWrapper } from 'google-maps-react' ;
import Nvi from '../Component/Nvi';
import Map from '../Component/Map';
import './asset.css';


class Asset extends Component{
    static defaultProps = {
        state: [' Maharashtra    ', 'Karnataka   ', 'Andhra Pardesh   ']
      }
     
      render() { 
        let statesOptions = this.props.state.map(states => {
            return <option key={states} value={states}>{states}</option>});
        return (
         <div>
              {/* <Nvi /> */}
              <h3> AGRITREKK Asset mang </h3>
              <form  >
              <div className="datasets">
              Location
            
                <div id="set"><br/>
               <label>Select State</label><br/>
               <select ref="states">
                {statesOptions}
               </select>
               </div>
               <div id="set">
               <label>Select Dist</label><br/>
               <select ref="states">
                {statesOptions}
               </select>
               </div>
               <div id="set">
               <label>Select village</label><br/>
               <select ref="states">
                {statesOptions}
               </select>
               </div><br/>
               Time
               
               <div id="set"><br/>
               <label>Select Year</label><br/>
               <select ref="states">
                {statesOptions}
               </select>
               </div>
               <div id="set">
               <label>Select Month</label><br/>
               <select ref="states">
                {statesOptions}
               </select>
               </div>
               </div>
                </form>
                 <Map google={this.props.google}/> 
        </div>
        );
    }
  }
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyDuW3X_bmESR7vV8bFvFG3H2xu8PKW-q_E',
  })(Asset)
 
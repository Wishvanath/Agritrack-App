import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Nvi from '../Component/Nvi';
import Map from '../Component/Map';
import '../Asset Manager/asset.css';
import $ from "jquery";

 
class Forecast extends Component{
    static defaultProps = {
        categories: [' Maharashtra    ', 'Karnataka   ', 'Andhra Pardesh   ']
      }

  render() { 
    let categoryOptions = this.props.categories.map(category => {
        return <option key={category} value={category}>{category}</option>});
    
    return (

        
      <div>
          {/* <Nvi /> */}
          <form >
           <div className="datasets">
             <div id='set'>
             <label>Select State</label><br/><br/>
             <select ref="category">
                {categoryOptions}
             </select>
            </div>
            {/* <div>
           <select ref="category">
                {villageOptions}
            </select>
            </div> */}
            <div id='set'>
            <label>Select Dist</label><br/><br/>
            <select ref="category">
                {categoryOptions} 
            </select><br/>
            </div>
            <div id='set'>
            <label>Select Village</label><br/><br/>
            <select ref="category">
                {categoryOptions}
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
  })(Forecast);
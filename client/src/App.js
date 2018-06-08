
import React, { Component } from 'react';
// import Nvi from './Component/Nvi'
// import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
// import Main from './Component/Plan';
import strategy from "../src/Component/Plan";           
import farm from "../src/farm/Farm";  
import '../src/Component/Nvi.css';

import DailyCov1 from '../src/DailyCoverage/DailyCov';
import Harvest from '../src/Harvestmon/Harvest';
import Forecast from '../src/forecast/Forecast';
import Asset from '../src/Asset Manager/Asset';
import Locate from '../src/farm/Locate_farm';
import Executive from '../src/farm/Executive';
import Report from '../src/farm/Report';
import Today from '../src/farm/Today';
import select from '../src/DailyCoverage/Select';
import DailyCov from '../src/DailyCoverage/DailyCov';
import Reportedit from '../src/farm/Reportedit';
import edit from '../src/farm/Reportedit';




class App extends Component {



//   constructor(){ 
//   super();
//   this.state={ 
//     pass: [] 
//   }
// }
// componentDidMount(){
//   this.setState({pass:[
//   ]});
// }
//  handleAddProject(project){
//   //  console.log(project);
//   let pass = this.state.pass;
//   pass.push(project);
//   this.setState({pass:pass});
//  }
render() {
  var id=90;
  return ( 
    <HashRouter>
      <div>
        <ul className="header">
          <li><NavLink to="/">AGRITREKK Planning</NavLink></li>
          <li><NavLink to="/locatefarm">AGRITREKK Locate Farm</NavLink ></li>
          <li><NavLink to="/realTimeMon">AGRITREKK Daily Coverage</NavLink ></li>
          <li><NavLink to="/realTimeMon.farmers/">AGRITREKK Harvest Mon</NavLink></li>
          <li><NavLink to="/forcast">AGRITREKK Forecast</NavLink></li>
          <li><NavLink to="/officeLocator">AGRITREKK Asset Manager</NavLink></li>
          {/* <li><NavLink to="/infrasStructureMon">AGRITREKK Infrastructure Mon</NavLink></li> */}
        </ul>  
        <li><NavLink to="/locatefarm/locate"></NavLink ><NavLink to="/locatefarm/today"></NavLink ><NavLink to="/locatefarm/executive"></NavLink ><NavLink to="locatefarm/report"></NavLink >
        </li>
        <div className="content">
         <Route exact path="/" component={strategy}/>
         <Route  path="/locatefarm" component={farm}/>   
         <Route  path="/realTimeMon" component={DailyCov}/>
         <Route  path="/realTimeMon.farmers" component={Harvest}/>  
         <Route  path="/forcast" component={Forecast}/> 
         <Route  path="/officeLocator" component={Asset}/>
         
        </div>
        <Route  path="/locatefarm/locate" component={Locate}/>   
         <Route path="/locatefarm/executive" component={Executive}/>
         <Route path="/locatefarm/report" component={Report}/>
         <Route path="/locatefarm/today" component={Today}/>
         <Route path='/real/:id' component={select}/>
         <Route path="/edit/:id" component={Reportedit}/>
         
      </div>
    </HashRouter> 
  );
}
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default App ;

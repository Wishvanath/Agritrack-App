 import React, { Component } from 'react';
// import Executive from "../farm/Farm";
// import farm from "../Component/Map"; 
import '../Asset Manager/asset.css';
// import $ from "jquery";

class Farm extends Component {
    static defaultProps = {
        state: ['Maharashtra', 'Telangana'] ,
        district :['Pune','Hyderabad'],
        taluka:['Haveli','Hsgdjh'],
        village:['Ahire','Ashtapur','Awasare Nagar','Bhawadi','Biwari','Hadapsar']
      }
      constructor(){
        super();
         this.state={data:[]};
         
      } 
    onDistChange(e){
        let dist=this.refs.dist.value;
        fetch(`/mapdist/${dist}`)
        .then(
            res=> res.json()
        ).then(data => this.setState({data}, () => console.log('Village Data fetched...', data)));
    }
    render() { 
        let stateOptions = this.props.state.map(state => { 
            return <option key={state} value={state}>{state}</option>});
            let distOptions = this.props.district.map(dist => { 
              return <option key={dist} value={dist}>{dist}</option>});
              let taluOptions = this.props.taluka.map(talu => { 
                return <option key={talu} value={talu}>{talu}</option>});
                let villOptions = this.props.village.map(vill => { 
                  return <option key={vill} value={vill}>{vill}</option>});
             
    return (
      <div>
      <div className="datasets">
          {/* <Nvi /> */} 
          <form >
          <a href="http://localhost:3000/#/locatefarm/executive"> Field Executive Detail</a>
          <br/><br/>
          <a href="http://localhost:3000/#/locatefarm/report"> Field Report Verification</a>
          <br/><br/>
          <div>
              {/* <input type="checkbox" id="today" name="interest" value="today"/> */}
              {/* <label for="today"> Today</label> */}
              <a  href="http://localhost:3000/#/locatefarm/today"> Today</a>
              </div> <br/>
           <div>
               {/* <input type="checkbox" id="pending" name="interest" value="today"/> */}
              <a  href="http://localhost:3000/#/locatefarm/report"> Pending</a>
           </div> <br/>     
           <a href="http://localhost:3000/#/locatefarm/locate">Locate Farms</a>
           <br/><br/>
           <div>
            <label>Select State</label><br/>
            <select ref="state"  >
            {stateOptions}
            </select>
            </div>
            <div>
            <label>Select Dist</label><br/>
           <select ref="dist" onChange={this.onDistChange.bind(this)} >
                {distOptions}
            </select>
            </div>
            <div>
            <label>Select Taluka</label><br/>
            <select ref="talu"  >
                {taluOptions}
            </select>
            </div>
            <div>
            <label>Select Village</label><br/>
            <select ref="vill" >
                {villOptions}
            </select><br/><br/>
            </div>
          </form>
          </div>  
      </div> 
    );
  }
}


export default Farm;
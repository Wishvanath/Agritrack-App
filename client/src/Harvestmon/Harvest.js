import React, { Component } from 'react';
import Nvi from '../Component/Nvi';
import './harv.css';

class Harvest extends Component {
    static defaultProps = {
      state: ['Maharashtra', 'Telangana'] ,
      district :['Pune','Hyderabad'],
      taluka:['Haveli','Hsgdjh'],
      village:['Ahire','Ashtapur','Awasare Nagar','Bhawadi','Biwari','Hadapsar'],
      }

      constructor(){ 
        super();
         this.state ={data:[]};}

          componentDidMount() {
            fetch('/farmerdetails')
              .then( 
                res =>res.json()
              )
              .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
        }

        onStateChange(e){
          let state = this.refs.state.value;  
          fetch(`/Stateselect/${state}`)
           .then( 
         res =>res.json()
         )
        .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
        }

        onDistChange(e){
          let Dist = this.refs.dist.value;
          fetch(`/Distselect/${Dist}`)
           .then( 
         res =>res.json()
         )
        .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
        }

        onvillChange(e){
          let village = this.refs.vill.value;
          fetch(`/villageselect/${village}`)
           .then( 
         res =>res.json()
         )
        .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
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
          {/* <Nvi /> */}
          <h3> AGRITREKK Harvest Mon </h3>
          <form  >
          <div className="datasets">
          <div id="set">
               <label>Select State</label><br/>
               <select ref="state" onChange={this.onStateChange.bind(this)}>
                {stateOptions}
               </select>
          </div>
          <div id="set"> 
            <label>Select Dist</label><br/>
            <select ref="dist" onChange={this.onDistChange.bind(this)}>
                {distOptions}
            </select>
          </div>
          <div id="set" onChange={this.onvillChange.bind(this)}>
            <label>Select Village</label><br/>
            <select ref="vill">
                {villOptions}
            </select>
          </div>
          </div>
          </form>
          <div className="center">
          <table className="center">
        <tbody>
        <tr>
        <th>Ser.no</th>
        <th>Farmer Name</th>
        <th>State</th>
        <th>Dist</th>
        <th>Taluka</th>
        <th>Village</th>
        <th>Contact ID</th>
        </tr>
        {this.state.data.map(data =>
        <tr key={data.id}>
        <td>  {data.id}</td>
        <td>  {data.name} </td>
        <td>  {data.state}</td>
        <td>  {data.district}</td>
        <td>  {data.taluka}</td>
        <td>  {data.village}</td>
        <td>  {data.farmer_id}</td>
        </tr>
        )}
        </tbody>
        </table>
        </div>
        
       </div>
    );
  }
}
export default Harvest;
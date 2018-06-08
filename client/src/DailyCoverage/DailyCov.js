import React, { Component } from 'react';
import Nvi from '../Component/Nvi';
import axios from 'axios';
import Select from '../DailyCoverage/Select';
import Images from '../DailyCoverage/Images';

import '../DailyCoverage/daily.css';
class DailyCov extends Component {
  
    static defaultProps = {
        state: ['Maharashtra', 'Telangana'] ,
        district :['Pune','Hyderabad'],
        taluka:['Haveli','Hsgdjh'],
        village:['Ahire','Ashtapur','Awasare Nagar','Bhawadi','Biwari','Hadapsar'],
        
      } 
      static id=undefined;
  constructor(){
      super();
      
       this.state={
        data:[],
        id:[],
        district:[
          {
            district:'Select district'
          }
        ],
        taluka:[
          {
            taluka: "Select taluka"
          },
        ],
        village:[
          {
            village: "Select village"
          },
        ]
       };
       
    }  
    componentDidMount() {
      fetch('/farmerdetails')
        .then( 
          res =>res.json()
        )
        .then(data => this.setState({data}, () => console.log('Data fetched...', data)));

      //  console.log(this.props.district);
      // this.id=['Maharashtra', 'Telangana'];
      fetch('/stateName')
      .then(
        res =>res.json()
      ).
      then(id => this.setState({id}, () => console.log('Data fetched...', id)));

      // fetch('/districtName')
      // .then(
      //   res =>res.json()
      // ).
      // then(district => this.setState({district}, () => console.log('Data fetched...', district)));
      
      // fetch('/talukaeName')
      // .then(
      //   res =>res.json()
      // ).
      // then(taluka => this.setState({taluka}, () => console.log('Data fetched...', taluka)));

      // fetch('/villageName')
      // .then(
      //   res =>res.json()
      // ).
      // then(village => this.setState({village}, () => console.log('Data fetched...', village)));

         
  }
    
            onStateChange(e){
              let state = this.refs.state.value;  
              fetch(`/Stateselect/${state}`)
               .then( 
             res =>res.json()
             )
            .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
            fetch(`/districtName/${state}`)
            .then(
              res =>res.json()
            ).
            then(district => this.setState({district}, () => console.log('Data fetched...', district)));
          }
            
            onDistChange(e){
              let state = this.refs.state.value;
              let distric = this.refs.dist.value;

              var Dist=state+","+distric;
              fetch(`/Distselect/${Dist}`)
               .then( 
             res =>res.json()
             )
            .then(data => this.setState({data}, () => console.log('Distrect Data fetched...', data)));
            //  console.log(Dist);
            fetch(`/talukaeName/${Dist}`)
            .then(
              res =>res.json()
            ).
            then(taluka => this.setState({taluka}, () => console.log('Data fetched...', taluka)));

            }
    
            onTalukaChange(e){
              let state = this.refs.state.value; 
              let Dist = this.refs.dist.value;
              let talu = this.refs.talu.value;
              
              var taluka=state+","+Dist+","+talu;
              // console.log(statedist);
              fetch(`/talukaselect/${taluka}`)
               .then(
                 res =>res.json()
               )
               .then(data => this.setState({data}, () => console.log('Taluka Data fetched...', data)));
               fetch(`/villageName/${taluka}`)
              .then(
                res =>res.json()
              ).
              then(village => this.setState({village}, () => console.log('Data fetched...', village)));

            }


            onvillChange(e){
              let state = this.refs.state.value; 
              let distric = this.refs.dist.value;
              let taluka = this.refs.talu.value;
              let vill = this.refs.vill.value;

              var village =state+","+distric+","+taluka+","+vill
              fetch(`/villageselect/${village}`)
               .then( 
             res =>res.json()
             )
            .then(data => this.setState({data}, () => console.log('Village Data fetched...', data)));
            }
                        
           onEdit(data){
            
            this.setState({
              id:data.farm_id,
          },function(){
            var id=this.state.id;
            // console.log(this.state.id);
            // this.props.pro(this.state.id);
                     
             window.location=`http://localhost:3000/#/real/${id}`;
          });
        }


  render() { 
    // console.log(this.state.id);
  //  console.log(this.sta);

  //  this.state.data.map(data =>
  //   <tr    key={data.farm_id}>
    
    let stateOptions = this.state.id.map(id => { 
        return <option key={id.state} value={id.state}>{id.state}</option>});
        let distOptions = this.state.district.map(dist => { 
          return <option key={dist.district} value={dist.district}>{dist.district}</option>});
          let taluOptions = this.state.taluka.map(talu => { 
            return <option key={talu.taluka} value={talu.taluka}>{talu.taluka}</option>});
            let villOptions = this.state.village.map(vill => { 
              return <option key={vill.village} value={vill.village}>{vill.village}</option>});
              // var id=this.state.id;
              // console.log(this.id);

  
    return (
      <div> 
          <form >
            <h3>AGRITREKK Daily Coverage</h3>
           <div className='datasets'>
           <div>
            <label>Select State</label><br/>
            <select ref="state" onClick={this.onStateChange.bind(this)} >
            {stateOptions}
            </select>
            </div>
            <div>
            <label>Select Dist</label><br/>
           <select ref="dist" onClick={this.onDistChange.bind(this)}>
                {distOptions}
            </select>
            </div> 
            <div>
            <label>Select Taluka</label><br/>
            <select ref="talu"  onClick={this.onTalukaChange.bind(this)}>
                {taluOptions}
            </select>
            </div>
            <div>
            <label>Select Village</label><br/>
            <select ref="vill" onClick={this.onvillChange.bind(this)}>
                {villOptions}
            </select><br/><br/>
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
        <th>Contract ID</th>
        </tr >
        {this.state.data.map(data =>
        <tr    key={data.farm_id}>
        <td>  {data.farm_id}</td>
         <td>  {data.farmer_name} </td>
        <td>  {data.state}</td>
        <td>  {data.district}</td>
        <td>  {data.taluka}</td> 
        <td>  {data.village}</td>
        <td>  {data.executive_id}</td>
        <td><button onClick={this.onEdit.bind(this,data)} >Images</button></td>
        </tr>
        )}
        </tbody>
        </table>
        </div> 
        {/* <div><Select /></div> */}
            
    </div>
    );
 }
}


export default DailyCov;
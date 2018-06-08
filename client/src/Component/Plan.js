import React,{ Component } from 'react';
// import Nvi from '../Component/Nvi';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from '../Component/Map'; 
import axios from 'axios';

class Plan extends Component{
  constructor(props) {
    super(props);
    this.state = {
        year: null,
        multiyear : null,
        todate : null,
        data:[]
    }
}  
      handleSubmit(e){
      var isError = false;
     if(this.state.year===null){
        if(this.state.multiyear===null){
            isError=true; 
            window.alert("Address fields cannot be left empty !");
        }
        if(this.state.todate===null){
            isError=true;
            window.alert("Year Fild and TO Fild can n't be empty !")
        }
        if(!isError){
            console.log('postgresql data in');
            axios.post('/postgresql',{ 
                multi : this.state.multiyear, //multiyear come form onMultiYearChange
                todate : this.state.todate,
            }).then(function(response){
                window.alert("Data Inserted to POSTGRESQL !");
                window.location.href = "http://localhost:3000/";
            }).catch(function(error){
              //toastr.clear();
              //toastr.error(error);
            });    
        }

     } else{
        if(this.state.multiyear===null){
            isError=true;
            window.alert("Multiyear cannot be left empty !");
        }
        if(!isError){ 
            console.log('SQL Data in');
            axios.post('/sqladd',{
                year : this.state.year,//year come from onYearChange
                multi : this.state.multiyear //multiyear come form onMultiYearChange
            }).then(function(response){
                // window.alert("Data Inserted to SQL DB !");
                // window.location.href = "http://localhost:3000/";
            }).catch(function(error){
              //toastr.clear();
              //toastr.error(error);
            });

            console.log('mongo data in');
            axios.post('/mongoadd',{
                year : this.state.year,//year come from onYearChange
                multi : this.state.multiyear //multiyear come form onMultiYearChange
            }).then(function(response){
                window.alert("Data Inserted to SQL and MONGO DB !");
                window.location.href = "http://localhost:3000/";
            }).catch(function(error){
              //toastr.clear();
              //toastr.error(error);
            });

            // console.log('redis data in');
            // axios.post('/redisadd',{
            //     year : this.state.year,//year come from onYearChange
            //     multi : this.state.multiyear //multiyear come form onMultiYearChange
            // }).then(function(response){
               
            //     window.location.href = "http://localhost:3000/";
            // }).catch(function(error){
            //   //toastr.clear();
            //   //toastr.error(error);
            // });

         
        }
        }
      e.preventDefault();
     }
      static defaultProps = {
        crops: ['Kharif', 'Rabi', 'Zaid'],
        year: ['2014', '2015', '2016']
      }  ;
       
    //   static defaultProps = {
    //     year: ['2014', '2015', '2016']
    //   }  ;
       
      
      onYearChange(e){
        this.setState({
            id : this.state.id,
            year : e.target.value.trim(),
            multiyear : this.state.multiyear
        });
    }
    
    onCropChange(e){
        let crop = this.refs.crop.value;
        fetch(`/crop/${crop}`)
        .then(
          res =>res.json()
        )
        .then(data => this.setState({data}, () => console.log('Taluka Data fetched...', data)));
    }

    onMultiYearChange(e){
        this.setState({
            id : this.state.id,
            year : this.state.year,
            multiyear : e.target.value
        });
    } 

    onToDateChange(e){
        this.setState({
            id:this.state.id,
            multiyear:this.state.multiyear, 
            todate :e.target.value
        }) 
    }
    render(){
        let cropOptions = this.props.crops.map(crop =>{
            return <option key={crop} value={crop}>{crop}</option>});
        let yearsOptions = this.props.year.map(years =>{
            return <option key={years} value={years}>{years}</option>});
            
            return (
                <div>
                {/* <Nvi /> */}
                <Map google={this.props.google} />

                
                <div className="datasets">
                <form onSubmit={this.handleSubmit.bind(this)}  >
               {/* <div><input type="checkbox"  id="myCheck"  onclick="myFunction()"  />
                  <p id="text">Checkbox is CHECKED!</p><label> Use map</label></div> */}
                    <h3>DataSet</h3>
                   <div id='set'><input type="checkbox"  id="myCheck"   />  
                   <label> Land Use and Cover Map </label></div>  
                   <br/> 
                   <div id='set'><input type="checkbox"  id="myCheck"    />
                     <label>Crop Health</label><br/>
                     {/* <input type="text" ref="category" /> */}
                      <select ref="crop" onChange={this.onCropChange.bind(this)} >
                         {cropOptions}
                     </select>
                   </div>
                   <br/>
                   <div id='set'> 
                     <label>YEAR</label><br/>
                     <select ref="year">
                         {yearsOptions}
                     </select>
                   </div>
                   <br/>
                   


                   {/* <div id='set'>
                      <label>Data for db</label><br/>
                      <input  type="text" name='year'
                                    onChange={this.onYearChange.bind(this)}
                                    id="year"  />
                    </div><br/> */}


                  <div id='set'><input type="checkbox"  id="myCheck"   value=''  />
                   <label> Multi Year</label></div> 
                   <input  type="text" name='multiYear'
                                    onChange={this.onMultiYearChange.bind(this)}
                                    id="multiYear" />
                   <br/>
                   
                   To <br/> 
                   <input type="text" name='todate'
                          onChange={this.onToDateChange.bind(this)} id="todate" /><br/>
                   <input type="submit" value="Submit" />
                   
                   
                </form>
            </div>
            </div> 
);
} 
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDuW3X_bmESR7vV8bFvFG3H2xu8PKW-q_E',
  })(Plan);
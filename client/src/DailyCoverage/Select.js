import React, { Component } from 'react';
import Farm from '../DailyCoverage/DailyCov';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import '../DailyCoverage/daily.css';
import Dali from '../DailyCoverage/DailyCov';
import axios from 'axios';
 
class Select extends Component{
    static defaultProps = {
    image:['Normal Image','NDVI Image'],imageData:[]
    }
    constructor(props){
        super(props)
        this.handleDayChange = this.handleDayChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state={selectedDay: undefined, Dayselected: undefined,}
        this.state={data:[] , }
            
    }
    
    add(){}

    componentDidMount() {
        var id=this.props.match.params.id;
        console.log(id);
        fetch(`/Data/${id}`)
          .then( 
            res =>res.json()
          )
          .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
    }

    submitForm(event){
        
        event.preventDefault();
        var isError = false;
        if(this.state.FormDay==null){
            isError=true;
            window.alert("Form Day field cannot be left empty !");
        }
        if(this.state.ToDay==null){
            isError=true;
            window.alert("To Date field cant be empty !");
        }
        if(!isError){ 
        
        
            var startdate =this.state.FormDay; //multiyear come form onMultiYearChange
               var  enddate = this.state.ToDay;
                var id=this.props.match.params.id;
                console.log(startdate.length);
                console.log(enddate);
                for (var i=1; i <=startdate.length ; i++) {
 
                    startdate = startdate.replace("/", "-");
                  
                  }
                console.log(startdate);
                for (var i=1; i <=enddate.length ; i++) {
 
                    enddate = enddate.replace("/", "-");
                  
                  }
                console.log(enddate);
                var t="skdjdk";
                var datefn= id+startdate+enddate+t;
                
                // axios.get(`/dat/${datefn}`)
                // .then( 
                //       res =>res.json()
                //     )
                //     .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
                  fetch(`/dat/${datefn}`).then( 
                          res =>res.json() 
                        )
                        .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
    
        }
        
    }
    
    handleDayChange(day) {
        this.setState({ selectedDay: day ,
            FormDay:day.toLocaleDateString()});
        
        // console.log(FormDay);
        
    }

    onChange(day){
        this.setState({ Dayselected: day,
        ToDay:day.toLocaleDateString() });
        // console.log(day);
        var Day = day.toLocaleDateString();

        console.log(Day);

        
    }

    handle(){
        window.location=`http://localhost:3000/#/realTimeMon`;
    }
    onhandleChange(){
        let Img = this.refs.img.value;
        let id=this.props.match.params.id;
        
        // console.log(id);
        // console.log(Img);
        if(Img == "Normal Image"){
       
        fetch(`/original/${id}`)
               .then( res =>res.json())
            .then(data => this.setState({data}, () => console.log('Distrect Data fetched...', data)));
        }
        else{
            fetch(`/NDVImage/${id}`)
               .then( res =>res.json())
            .then(data => this.setState({data}, () => console.log('Distrect Data fetched...', data)));
        }

    }
    
    render(){
        let ImageOptions = this.props.image.map(imag => {
            return <option key ={imag} value={imag}>{imag}</option>});
        const { selectedDay } = this.state;
        const { Dayselected } = this.state;
    //   console.log(this.props.match.params.id);
     
            
    return(
   
    <div >
        
        <button onClick={this.handle} >Back</button><br/><br/>
        {this.state.data.map(data =>
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
        {/* <th>Contract ID</th>
        <th>original image </th> */}
        </tr >
        <tr    key={data.farm_id}>
        <td>  {data.farm_id}</td>
         <td>  {data.name} </td>
        <td>  {data.state}</td>
        <td>  {data.district}</td>
        <td>  {data.taluka}</td> 
        <td>  {data.village}</td>
        <td> {data.ndvi_image} </td>
        <td>  {data.image}</td>
        </tr>
        </tbody>
        </table><br/><br/>
    
        <div >  
            <img width="10%" src={"/" + data.ndvi_image}  /> 
            <img width="10%" src={"/" + data.ndvi_image}  /> 
            <img width="10%" src={"/" + data.ndvi_image}  />
            {/* <div> 01 March 2018    01 March 2018      01 March 2018 </div> */}
            
            {/* <input type="submit" value="map"  /> */}
        </div>
    </div> 
    )}
      
      <form onSubmit={this.submitForm.bind(this)}>
      <div className="size">   
            <label>Image Type</label><br/>
            <select ref="img" onChange={this.onhandleChange.bind(this)}   >
            {ImageOptions}
            </select>
            <p></p>
              <p>FORM</p>
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Choose a day</p>}
        <DayPickerInput onDayChange={this.handleDayChange.bind(this)} /><br/>
         <label>TO</label>
        {Dayselected && <p>Day:{Dayselected.toLocaleDateString()}</p>}
        {!Dayselected && <p>Choose a day</p>}
        <DayPickerInput onDayChange={this.onChange.bind(this)} />
        <br/>
        <button type="submit"  >Go</button>
      </div> 
      {/* <h2>{this.props.match.params.id}</h2> */}
      </form>
  </div>
        )
    }
}


export default Select ;
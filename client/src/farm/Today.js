import React, { Component } from 'react';
import Reportedit from '../farm/Reportedit';

class Today extends Component {
    constructor(){
        super();
        this.state ={
            data: []
        };
    }



    
  
     componentDidMount(){
        // var currentTime = new Date();
        // console.log(currentTime);
    //     var today = new Date();
    //    var dd = today.getDate();
    //    var mm = today.getMonth()+1; //January is 0!
    //     var yyyy = today.getFullYear();

    //     if(dd<10) {
    //         dd = '0'+dd
    //     } 

    //     if(mm<10) {
    //         mm = '0'+mm
    //     } 

    //     today = mm + '/' + dd + '/' + yyyy;
    //     // document.write(today);
    //       console.log(today);

         fetch('/today').then(res =>res.json())
         .then(data => this.setState({data},() => console.log('Data Fetched.. ',data)));
     }
  
     handleSubmit(e){
     console.log('Submit');
     
     e.preventDefault();
  }
    render(){
        return(
            <div>
                 <div className="datasets"> 
                 {this.state.data.map(data =>
                  <div key={data.farm_id}>
                  
                  <label>id: {data.farm_id} </label>
                  <label> Name:  </label>{data.name}
                  <label> State:{data.state}</label>
                  <label> Dist:{data.district}</label>
                  <label> Vill:{data.village}</label>
                  <label> Area:{data.area}</label>
                  <label>Mobile.No:{data.mobile_no}</label>

                  <input type="submit" value="Plot varification"  onSubmit={this.handleSubmit.bind(this)}/>
                  
                  </div>
                   )}
                 </div> 
                </div>
        )
    }  
}

export default Today ; 
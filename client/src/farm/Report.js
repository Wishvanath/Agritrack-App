import React, { Component } from 'react';
import axios from 'axios';
import Edit from "../farm/Reportedit";
import images from "../DailyCoverage/Images";

class Report extends Component {
    
  constructor(props){
      super(props);
      this.state ={
        //   name:null,
          id: null,
          val:null,
          data: []
      };
  } 

   componentDidMount(){
       fetch('/farmdetails').then(res =>res.json())
       .then(data => this.setState({data},() => console.log('Data fatch..',data)));
        console.log(this.state.data);
   }
    
//    
//    console.log(this.id);
//     onEdit(id){
//     let Id = id;
//     console.log(Id);
//     fetch(`/edit+farm/${Id}`).then(res =>res.json())
//        .then(data => this.setState({data},() => console.log('Data fatch..',data)));
// // }

//    }


handleClick(data) {
    
    
    var val= data.farm_id;
  
    var id= val;
    console.log(id); 

    window.location=`http://localhost:3000/#/edit/${id}`;
    // console.log(farm_id);
    // return id=this.props.id

    // axios.post(`/vry`,{
    // id:val.farm_id 
    
    // });
    
    // window.alert('data update');
    // window.location.href="http://localhost:3000/?#/locatefarm";
    
    

} 
  render(){
    {       
    return(
          <div>
              {this.state.data.map(data =>
                <div key={data.id}>
              {/* <Edit id={data.id}/> */}
              {/* <Route path='/edit/${}' component={edit}/> */}
              <div className="datasets">
              
                <form >
                {/* <form> */}
                {/* <tr key={data.id}> */}
                <img width="10%" src="/images/planet.png" /> <br/>
                <label>farm id: {data.farm_id}</label><br/>
                <label> Name:  </label>{data.name}<br/>
                <label> State:{data.state}</label><br/>
                <label> Dist:{data.district}</label><br/>
                <label> Vill:{data.village}</label><br/>
                <label> Area:{data.area}</label><br/>
                {/* </tr>  */}   
                <button onClick={this.handleClick.bind(this,data)}>Plot varification</button>
                {/* <input type="submit" value="Submit" /> */}  
               
                {/* <button onClick={this.onEdit.bind(this,data.id)} > Edit</button> */}
                </form>
                 
                </div>
                 
               </div>
               )}
              </div> 
          )
  }
  }
  handleSubmit(id){
    // console.log('Submit');
    
    // this.setState({id:{
    //     id:this.id
    // }}),function(){
    //     console.log(this.state);
    // }


    var val= id;
   
    console.log(id);

    // console.log(val); 
  //  fetch(`/select/${val}`)
  //   .then(res =>res.json()) 
  //          .then(data => this.setState({data},() => console.log('Data fatch..',data)))
         }
}
 


export default Report;
import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from '../farm/Plotmap';
import Fam from '../farm/Farm';

import FieldEdit from '../farm/FieldEdit'

class Reportedit extends Component{
    
    componentDidMount(){
        var id=this.props.match.params.id;
        console.log(id);
    } 
    render(){ 
    return( 
        <div>   
            <Fam />
            <Map google={this.props.google}id={this.props.match.params.id} />
            <FieldEdit id={this.props.match.params.id}/>
            </div>
    )
    }

}

export default  GoogleApiWrapper({
    apiKey: 'AIzaSyDuW3X_bmESR7vV8bFvFG3H2xu8PKW-q_E',
  })(Reportedit);




//   function onchange(){
//     var vtx = this.getPath();
//     var constr
//     for (var i =0; i < vtx.getLength(); i++) {
//       var xy = vtx.getAt(i);
//       constr += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
//           xy.lng();
//     }
//     console.log(constr);
//   }
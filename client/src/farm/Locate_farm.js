import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from '../farm/Map';


// import "../Asset Manager/asset.css";



class Locate extends Component {

  static defaultProps = {
    crops: ['Kharif', 'Rabi', 'Zaid'],
    year: ['2014', '2015', '2016']
  }

  constructor() {
    super();
    this.state = { dat: [] }

      , { val: [] };
  }

  // data.features.geometry:  .features.geometry.coordinates

  componentDidMount() {
  //   var a = 20;


    fetch('/mapdata')

      // res =>{ return res.json() ;

      .then(res =>res.json())
       .then(data => this.setState({data},() => console.log('Data fatch..',data)));
        // console.log(this.state.data);

  //     .then(dat => {

  //       this.setState({ dat })
  //       for (var i = 0; i < dat.features.length; i++) {
  //         var coords = dat.features[i].geometry.coordinates;
  //         //console.log(coords)
  //         //Map.props.addPolygon(coords)
        }
  //     });

  //   var cors = []

    

  //   // 
  //   // console.log(this.state.dat);

  //   //dat.features[1].geometry.coordinates[0][0][0])
  //   // console.log(this.state.data);
  //   // console.log(a);
  //   // for (var i = 0; i < this.a.features.length; i++) {
  //   // var coords = a.features[i].geometry.coordinates;
  //   // var latLng = new google.maps.LatLng(coords[1],coords[0]);
  //   // var marker = new google.maps.Marker({
  //   //   position: latLng,
  //   //   map: map
  //   // });
  //   // }

  //   // // var data= this.props.data;
  //   // console.log(this.props.data);
  //   // // console.log(this.state.data);

  // }
  // setdata(data){ 
  //   let newArray = [];
  //   for(var i=0;i < data.features.length; i++){
  //     newArray.push(data.features[i]);
  //   } 
  //   this.setState ({data:newArray});
  //   }

  // addPolygon() {
    
  // }

  render() {
    // const postData = this.props.data;
    // console.log(this.data);



    // var data = this.state.dat.features;
    // // console.log(data);
    // if (data != null)
    //   for (var i = 0; i <= this.state.dat.features.length; i++) {

    //     //console.log(data[i]);
    //   }
    //  console.log(this.state.dat.features[0]);
    let cropOptions = this.props.crops.map(crop => {
      return <option key={crop} value={crop}>{crop}</option>
    });
    let yearsOptions = this.props.year.map(years => {
      return <option key={years} value={years}>{years}</option>
    });



    return (

      <div>
        <Map google={this.props.google} />

        <div className="datasets">


 
          <form>

            <h3>DataSet</h3>
            <div id='set'><input type="checkbox" id="myCheck" />
              <label> Land Use and Cover Map </label></div>
            <br />
            <div id='set'><input type="checkbox" id="myCheck" />
              <label>Crop Health</label><br />
              {/* <input type="text" ref="category" /> */}
              <select ref="crop">
                {cropOptions}
              </select>
            </div>
            <br />
            <div id='set'>
              <label>YEAR</label><br />
              <select ref="year">
                {yearsOptions}
              </select>
            </div>
            <br />

            <div id='set'><input type="checkbox" id="myCheck" value='' />
              <label> Multi Year</label></div>
            <input type="text" name='multiYear'
              id="multiYear" />
            <br />

            To <br />
            <input type="text" name='todate' id="todate" /><br />
            {/* } */}
          </form>

          {/* })} */}

        </div>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDuW3X_bmESR7vV8bFvFG3H2xu8PKW-q_E',
})(Locate);
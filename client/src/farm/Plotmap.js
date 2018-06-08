import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../Component/Style.css';
import axios from 'axios';

export default class Map extends Component {
  constructor(props){
    super(props);
    this.state={
 
    }; 
  }

  data = [];
 
  componentDidUpdate() {
    this.loadMap();  
  }  
  componentDidMount(){
   
    this.add();
    // this.loadMap();
  }
  
 
  add() {
    var controller = this;
    var id=this.props.id;
    fetch(`/mapdata/${id}`)
        // res =>{ return res.json() ;
        .then(res => res.json())
        .then(dat => {  
            this.setState({ dat })
            for (var i = 0; i < dat.features.length; i++) {
                var coords = dat.features[i].geometry.coordinates[0];
                var latlons = coords.map(a => {
                    this.setState.data = { lat: a[1], lng: a[0] };
                    console.log(this.setState.data);
                    console.log(dat);
                    return this.setState.data
                })
                this.data.push(latlons) 
            }
        });
       }
 
  loadMap() {
    var infoWindow;
    var coordinates;
    var chicago = {lat: 41.85, lng: -87.65};
    var id=this.props.id;
    function CenterControl(controlDiv, map) {

      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '3px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.marginBottom = '22px';
      controlUI.style.textAlign = 'center';
      controlUI.title = 'Click to recenter the map';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.style.color = 'rgb(25,25,25)';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.fontSize = '16px';
      controlText.style.lineHeight = '38px';
      controlText.style.paddingLeft = '5px';
      controlText.style.paddingRight = '5px';
      controlText.innerHTML = 'verified';
      controlUI.appendChild(controlText);

      // Setup the click event listeners: simply set the map to Chicago.
      controlUI.addEventListener('click', function() {
        // map.setCenter(chicago);
        console.log(id);
        console.log(coordinates);
        axios.post('/insertcoordinates',{ 
              id,
              coordinates,
          })
          window.alert("Farm verified !");
          window.location.href = "http://localhost:3000/#/locatefarm/report";
      });
    }
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props
      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node
      const mapConfig = Object.assign({}, {
        center: {lat: 18.6716895369838, lng: 84.3602508679032}, // sets center of google map to NYC.
        zoom: 25, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'hybrid' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })
      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      for (var i = 0; i < this.data.length ; i++) {
        var bermudaTriangle = new google.maps.Polygon({
        paths: this.data[i],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35, 
        editable: true,
      });
    bermudaTriangle.setMap(this.map);
    var vertices = bermudaTriangle.getPath();
    coordinates=0;
    for ( i =0; i < vertices.getLength(); i++) {
      var xy = vertices.getAt(i);
      coordinates= coordinates + ',' + xy.lng() + ' ' + xy.lat() ;
  
    }
    //  console.log(coordinates);
    
    google.maps.event.addListener(bermudaTriangle.getPath(), 'set_at', function () {
      var vertices = bermudaTriangle.getPath();
      coordinates=0;
      for ( i =0; i < vertices.getLength(); i++) {
      var  xy = vertices.getAt(i);
      coordinates=
      coordinates + ',' + xy.lng() + ' ' + xy.lat() ;  // alter lng lat to lat lng  
      } 
      // this.state={Mapcord:id};
      // this.Mapcord=id;
      console.log(coordinates);
      
     });
     
     google.maps.event.addListener(bermudaTriangle.getPath(), 'insert_at', function() {
      var vertices = bermudaTriangle.getPath();
      coordinates=0;
      for ( i =0; i < vertices.getLength(); i++) {
      var  xy = vertices.getAt(i);
      coordinates=
      coordinates + ','+ xy.lng() + ' ' + xy.lat() ;
      } console.log(coordinates);
     });
      

    bermudaTriangle.addListener('click', showArrays);    
    infoWindow = new google.maps.InfoWindow();

  }
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, this.map);
  centerControlDiv.index = 1;
  this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);

  
      function showArrays(e){
        
        var vertices = this.getPath();
        var contentString = '<b>Bermuda Triangle polygon</b><br>' +
            'Clicked location: <br>'  + e.latLng.lat() + ',' + e.latLng.lng() +
            '<br>';
            for ( i =0; i < vertices.getLength(); i++) {
              var xy = vertices.getAt(i);
              contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                  xy.lng();
            } 
            // console.log(contentString);
            // for ( i =0; i < vertices.getLength(); i++) {
            //    xy = vertices.getAt(i);
            //   this.id=this.id + ',' + xy.lat() + ',' + xy.lng();
            // } console.log(this.id);
            infoWindow.setContent(contentString);
            infoWindow.setPosition(e.latLng);
            infoWindow.open(this.map);  
      }     
    }  
  }  
  
  onEdit(data){
    var id=data;
    console.log(id);
   
  }

  render() {
  
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
        width: '65%', // 90vw basically means take up 90% of the width screen. px also works.
        height: '75vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.        
      } 
      return ( // in our return function you must return a div with ref='map' and style.
        <div  >
          <div id="map" ref="map" style={style}>
          loading map...
          {this.loadMap()} 
          </div> 
          {/* id:{this.Mapcord}
           <button onClick={this.onEdit.bind(this,this.Mapcord)} >Vry</button> */}
        </div>
      )
    }
  }
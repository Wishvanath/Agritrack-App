import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './Style.css';

export default class Map extends Component {
  constructor(){
    super();
    this.state={
      data:[]
    };
  }
  data = [];
  
  static defaultProps = {
    categories: ['Kharif', 'Rabi', 'Zaid']
  }

  componentDidUpdate() {
    this.loadMap();  
  }  
 
  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props
 
      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node
   
      const mapConfig = Object.assign({}, {
        center: {lat: 20.5937, lng: 78.9629}, // sets center of google map to NYC.
        zoom: 5, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'hybrid' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

    }  
  }  

  render() 
  {let categoryOptions = this.props.categories.map(category => { 
    return <option key={category} value={category}>{category}</option>});
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
        width: '78%', // 90vw basically means take up 90% of the width screen. px also works.
        height: '85vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
        
      }
  
      return ( // in our return function you must return a div with ref='map' and style.
        <div id="map" ref="map" style={style} >
          loading map...
                  
        </div>
      )
    }
  }
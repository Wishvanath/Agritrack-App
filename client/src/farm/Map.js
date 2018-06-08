import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../Component/Style.css';
import { InfoWindow } from 'google-maps-react/dist/components/InfoWindow';

export default class Map extends Component {
    constructor() {
        super();
        this.state = { 

            // data: []
        };
    }

    data = [];
    val =[];


    //   componentDidUpdate() {
    //     this.loadMap();  
    //   } 

    componentDidMount() {
        this.add();
        // this.loadMap()
    }

    add() {
        var controller = this;

        fetch('/mapdata')
            // res =>{ return res.json() ;
            .then(res => res.json())
            .then(dat => {  

                this.setState({ dat })
                for (var i = 0; i < dat.features.length; i++) {
                    var coords = dat.features[i].geometry.coordinates[0];
                    // console.log(coords);
                    var latlons = coords.map(a => {
                        this.setState.data = { lat: a[1], lng: a[0] };
                        console.log(this.setState.data);
                        // console.log(latlons);
                        //   return { lat: a[0], lng: a[1] }
                        return this.setState.data
                    })

                    this.data.push(latlons)
                }
                for (var i = 0; i < dat.features.length; i++) { 
                    var coords = dat.features[i].properties;
                    // console.log(coords);
                        this.setState.val = { farm_id: coords.f1, cnt_id: coords.f2 };
                        var d=this.setState.val;
                        // console.log(this.setState.val);
                        console.log(d);
                        return this.setState.val
                

                this.val.push(d);
                }
            });
    }


    loadMap() {

        // var map;
        var infoWindow;

        if (this.props && this.props.google) { // checks to make sure that props have been passed
            const { google } = this.props; // sets props equal to google
            this.maps = google.maps; // sets maps to google maps props

            const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
            const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

            const mapConfig = Object.assign({}, {
                center: { lng: 84.3602508679032 , lat : 18.6716895369838 }, // sets center of google map to NYC.
                zoom: 15, // sets zoom. Lower numbers are zoomed further out.
                mapTypeId: 'hybrid' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
            })

            this.map = new this.maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

            for (var i = 0; i < this.data.length ; i++) {
               
                var village = new google.maps.Polygon({
                    paths: this.data[i],
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });
                village.setMap(this.map);

                village.addListener('click', showArrays);
                infoWindow = new google.maps.InfoWindow();
            } 
            // @this {google.maps.Polygon}
              function showArrays(event) {
        // Since this polygon has only one path, we can call getPath() to return the
        // MVCArray of LatLngs.
        var vertices = this.getPath();
        var id=this.val;
        console.log(id);
        
        var contentString = '<b>Fram polygon</b><br>' +
            'Clicked location: <br>'  + event.latLng.lat() + ',' + event.latLng.lng() +
            '<br>';

        // Iterate over the vertices.
        for (var i =0; i < vertices.getLength(); i++) {
          var xy = vertices.getAt(i);
          
        
        //   console.log("sdbfkjsd",xy);
          contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
              xy.lng() ;
          

        }

        // Replace the info window's content and position.
        infoWindow.setContent(contentString);
       
        infoWindow.setPosition(event.latLng);

        infoWindow.open(this.map);
         }
        }
    }

    render() {
        
    
        const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
            width: '60%', // 90vw basically means take up 90% of the width screen. px also works.
            height: '85vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.

        }

        return ( // in our return function you must return a div with ref='map' and style.
            <div id="map" ref="map" style={style} >
                loading map...
                  {this.loadMap()}
            </div>
        )
    }
}

// var pgp = require('pg-promise');
var pg = require('pg');
var db = process.env.ELEPHANTSQL_URL || "postgres://postgres:rewq@localhost/Agretrekk";
var client = new pg.Client(db);
 

var coffee_query ="SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id, name)) As properties FROM cambridge_coffee_shops As lg) As f) As fc";

client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    console.log('Postgres connected');
    });


    

module.exports=client; 


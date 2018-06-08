
const express = require('express');
const app = express();
// var con = require("./dbconnection.js"); 
var cors = require('cors');
var route = require("./routes/framrouter.js");
var control =require("./controllers/framcontroller.js");
// var db = require("./mondb.js");

//Middle ware 
app.use("/",route); 
// make  our db accessible to our router
app.use(function(req,res,next){ 
  req.db=db;
  next();
});


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


 

app.post('/sqladd',control.farm_add);
app.post('/mongoadd',control.mongo_add);

// app.post('/redisadd',control.redis_add);
app.post('/postgresql',control.postgres_add);
 
app.post('/vry',control.farm_vary);

app.post('/insertcoordinates',control.coordinates_insert)



//-------------------------------

module.exports=app;

const port = 5000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));

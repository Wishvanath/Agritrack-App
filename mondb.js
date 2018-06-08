//Connect mongodatabase
const express = require('express');
const app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/data');



app.use(function(req,res,next){  
    req.db=db;
    next();
  });
   
// var db = req.db;
// var conn=db.get('customer');

console.log('mongo Db connected');

module.exports = db;
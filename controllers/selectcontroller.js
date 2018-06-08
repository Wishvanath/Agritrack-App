var express = require('express');
var client = require("../dbpostgres.js"); 




exports.stateName = function(req,res) {
  var result=[];
  var query=client.query(`SELECT DISTINCT state FROM farm_details`);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
    
    return res.json(result);
  });
  };



exports.districtName = function(req,res) {
  let state= req.params.state;
  
  var result=[];
    var query=client.query(`SELECT DISTINCT district FROM farm_details where state='${state}'`);
    
       query.on('row',function(row){
      result.push(row);
    })
    query.on('end',function(){
      return res.json(result);
    });
  };


  exports.talukaeName = function(req,res) {  
    let diststate= req.params.Dist;  
     var split=diststate.split(",");
    let state=split[0]
    let district=split[1];
    
    var result=[];
    var query=client.query(`SELECT DISTINCT taluka FROM farm_details where state='${state}'and district='${district}' `);//where district='${district}'
    console.log(query);
       query.on('row',function(row){
      result.push(row);
    })
    query.on('end',function(){
      // console.log(result);
      return res.json(result);
    });
  };

  exports.villageName = function(req,res) {
    let vill= req.params.taluka;  
    console.log(vill);
    var split=vill.split(",");
    let state=split[0]
    let district=split[1];
    let taluka=split[2];
    
    console.log(state);
    console.log(district);
    console.log(taluka);
    
    
    var result=[];
    var query=client.query(`SELECT DISTINCT village FROM farm_details where state='${state}' and district= '${district}' and taluka= '${taluka}'`);
    
       query.on('row',function(row){ 
      result.push(row);
    })
    query.on('end',function(){
      return res.json(result);
    });
  };
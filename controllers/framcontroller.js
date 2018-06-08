
var express = require('express');
const app = require("../server.js");
var control = require("../controllers/framcontroller.js");
// var con = require("../dbconnection.js");
// var db = require("../mondb.js");
// var client = require("../reddb.js"); 
var client = require("../dbpostgres.js"); 


module.exports.Homepage =  function(req,res){
   res.status(200).send("response from customer router from controller");
};

module.exports.app = function(req,res,next){
  req.db=db;
  next();
}
/*
module.exports.viewCustomers = function (req, res) {
   con.query('SELECT * FROM customers', function (error, results, fields) {
   if (error) throw error;
   res.json(results); 
 });
 
}

*/ 
// var coffee_query ="SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id, name)) As properties FROM cambridge_coffee_shops As lg) As f) As fc";

//add a farm
module.exports.farm_add = (req,res)=>{ 
  let year = req.body.year;
  let multi = req.body.multi;
  let post = {name:year, address:multi};
  
  let sql = 'INSERT INTO customers SET ?';
  let query = con.query(sql,post,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send('New data added..');
  });
//   client.query(`SELECT name, address ,zip,lat,lon FROM cambridge_coffee_shops WHERE id BETWEEN ${req.body.year} AND ${req.body.multi} `,function(error,results,fields){   
//     if(error) throw error;
//     console.log(results);  
//  });
// var db = req.db;
//   var add=db.get('customer');
//   add.insert(post,function(err,result){
//     if(err) throw err; 
//     console.log(result);
//     res.send('Customer 1 added..');
//   });
}

module.exports.mongo_add =  (req,res)=>{
  console.log('chjiodjo');
  let year = req.body.year;
  let multi = req.body.multi;
  let post = {name:year, address:multi};
  console.log('hellp');
  var db = req.db;
  var add=db.get('customer');
  add.insert(post,function(err,result){
    if(err) throw err; 
    console.log(result);
    res.send('Customer 1 added..');
  });
}

module.exports.postgres_add =  (req,res)=>{
  let todate = req.body.todate;
  let multi = req.body.multi;
  // let post = {name:year, address:multi};
  // var query = client.query(coffee_query);
  //   query.on("row", function (row, result) {
  //       result.addRow(row);
  //   });
  //   query.on("end", function (result) {
  //       res.send(result.rows[0].row_to_json);
  //       res.end();
  //   });
  // client.query(`SELECT name, address ,zip,lat,lon FROM cambridge_coffee_shops WHERE id BETWEEN ${req.body.multi} AND ${req.body.todate} `,function(error,results,fields){   
  //       if(error) throw error;
  //       console.log(results);  
  //    });
};

module.exports.redis_add =  (req,res)=>{
  let year = req.body.year;
  let multi = req.body.multi;
  let post = {name:year, address:multi};
  client.set(customer_id,customer_address,function(err,result){
  console.log(result); });
};

  //redis
  // client.set(customer_id,customer_address,function(err,result){
  //   console.log(result); });

  //MONGO DB
  // var db = req.db;
  // var add=db.get('customer');
  // add.insert(post,function(err,result){
  //   if(err) throw err;  
  //   console.log(result);
  //   res.send('Customer 1 added..');
  // });
  //MYSQL  
  // let sql = 'INSERT INTO customers SET ?';
  
  // let query = con.query(sql,post,(err,result)=>{
  //   if(err) throw err;
  //   console.log(result);
  //   res.send('New data added..');
  // });
//Postgrese sql
//   client.query(`SELECT name, address ,zip,lat,lon FROM cambridge_coffee_shops WHERE id BETWEEN ${req.body.year} AND ${req.body.multi} `,function(error,results,fields){   
//     if(error) throw error;
//     console.log(results);  
//  });


// client.get('data',function(err,result){
  //   console.log(result);
  // })


  //  get all customers
module.exports.farm_vary= (req,res)=>{ 
  let id = req.body.farm_id;
  console.log(id);
  var get= client.query(`UPDATE farm_details SET  verification_status='true' WHERE farm_id='${id}' `);
  // if(err) throw err; 
  //   console.log(result);
  //   res.send('New data added..');
}

  module.exports.coordinates_insert = (req,res)=>{
    let id = req.body.id;
    let cord = req.body.coordinates;
    console.log(id,cord);
    // // console.log(cord.length);
    cord=cord.substring(2, cord.length);
    // console.log(cord);
    
    query1 = `SELECT ST_GeomFromText('POLYGON((`+cord+`))',4326);`
    // //Convert coordinates to geometry datatype
     
    var query = client.query(query1);
    console.log(query);

		query.on("row", function (row, result,end) {
		    result.addRow(row);
        saveShape(result.rows[0].st_geomfromtext);
        // shapefile coverter.
		});

		function saveShape(geom) {
                   var insert_query =`UPDATE farm_details SET  geom='${geom}',verification_status=true WHERE farm_id='${id}'`;
                  // console.log(geom);
                  // var insert_query = `INSERT INTO  samp VALUES(\'`+id+`\',\'`+geom+`\')`;
                  //  var insert_query =`UPDATE samp SET  geom='${geom}' WHERE farm_id='${id}'`;
                  
                  console.log(insert_query);
                var query = client.query(insert_query);
    }
    
  }

  exports.executive_list = function(req, res) {
  var results=[];
  var id='san';
  // var get= client.query(`select * from executive_details where name = '${id}'`);
  var get= client.query(`select * from executive_details `);
  console.log(get);
 get.on('row',function(row){
   results.push(row);
 })
 get.on('end',function(){
   console.log(results);
   return res.json(results);
 });
 
};

//get all farmerdetails;
exports.farmer_list = function(req,res) {
  var result=[];
  var query=client.query(`select farm_details.farm_id ,farmer_details.farmer_name ,farm_details.state,farm_details.district,farm_details.taluka,farm_details.village,farm_details.executive_id 
	from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farmer_id
	 inner join executive_details on farm_details.executive_id = executive_details.executive_id`);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
    return res.json(result);
  });
};
 
//todays panding
exports.today=function(req,res){
  var result=[];
  // let date= req.body.today;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
   var yyyy = today.getFullYear();

   if(dd<10) {
       dd = '0'+dd
   } 

   if(mm<10) {
       mm = '0'+mm
   } 

   today = dd + '/' + mm + '/' + yyyy;
   // document.write(today);
     console.log(today);

  // console.log(date);
  // var query=client.query(`SELECT id, name, area, village, district, state, mobile_no, verification_status, add_date FROM farm_details where verification_status is false AND add_date = '29/03/2018'`);
  var query=client.query(`SELECT farm_id, area, village, district, state, verification_status, add_date FROM farm_details where verification_status is false AND add_date = '${today}'`);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
    console.log(result);
    return res.json(result);
  });
}



//all report panding
exports.farm_details = function(req,res){
  var result=[];
  var query=client.query(`SELECT farm_id,area, village, district, state FROM farm_details
   where verification_status is false`);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
    // console.log(result);
    return res.json(result);
  });
}



exports.date = (req,res)=>{
    
 let id= req.params.id;

  F_id=id.substring(0, 2);
 console.log(id);
 startdate=id.substring(2, 12);
 console.log(startdate);
 enddate=id.substring(12, 22);
 console.log(enddate); 
 
  
  
  var result=[];
  var select_query=`select farmer_details.farmer_name,farm_details.farm_id,farm_details.state,farm_details.district,farm_details.taluka,
  farm_details.village,executive_details.executive_id,image.image,image.ndvi_image
  from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farm_id
  inner join executive_details on farm_details.executive_id = executive_details.executive_id
  inner join image on farm_details.farm_id=image.farm_id where image.farm_id= '${F_id}' and image.acquired BETWEEN '${startdate}' AND '${enddate}'`

  var query = client.query(select_query);
  // console.log(query);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
    return res.json(result);
  });
}


  


exports.select_farmer = function(req,res){
  let state = req.body.state;
  let district = req.body.district;
  let taluka =req.body.taluka;
  let village =req.body.vilalge;
 
  console.log(state);
  console.log(district);
  console.log(taluka);
  console.log(village);

}
//select by state,dist,village,taluka
exports.select_state = function(req,res){
  var state = req.params.state; 
  console.log(state);
  var result=[];
  var farm_query = (`select farm_details.farm_id,farmer_details.farmer_name ,farm_details.state,farm_details.district,farm_details.taluka,farm_details.village,farm_details.contract_id 
	from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farmer_id AND state='${state}'`);
  var query=client.query(farm_query);
  console.log(farm_query);
 
  query.on('row',function(row){
   result.push(row);
   
  })
  query.on('end',function(){
  // console.log(result);
   return res.json(result);
  }); 
 
}
exports.select_Dist= function(req,res){
  var disstat = req.params.Dist;  

  var split=disstat.split(",");
  
  let state=split[0]
  let district=split[1];
  console.log(district);
  var result=[];
  var farm_query = (`SELECT farm_details.farm_id,farmer_details.farmer_name ,farm_details.state,farm_details.district,farm_details.taluka,farm_details.village,farm_details.contract_id 
	FROM farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farmer_id AND state='${state}' and District= '${district}'`);
  var query=client.query(farm_query);
  console.log(farm_query);
  // console.log(query);
  query.on('row',function(row){
   result.push(row);
   
  })
  query.on('end',function(){
  // console.log(result);
   return res.json(result);
  }); 
}

exports.select_taluka = function(req,res){
  var taluka = req.params.taluka;
  var split=taluka.split(",");
  let state=split[0]
  let district=split[1];
   taluka=split[2];
  
  var result=[];
  var select_query = (`SELECT farm_details.farm_id,farmer_details.farmer_name ,farm_details.state,farm_details.district,farm_details.taluka,farm_details.village,farm_details.contract_id 
	FROM farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farmer_id and state='${state}' and District= '${district}' AND taluka= '${taluka}'`);
  var query = client.query(select_query);
  console.log(query);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
    return res.json(result);
  });
} 


exports.select_vill = function(req,res){
    let vill= req.params.village;  
    console.log(vill);
    var spl=vill.split(",");
    let state=spl[0]
    let district=spl[1];
    let taluka=spl[2];
    let village=spl[3]
    var result=[];
    var farm_query = (`select farm_details.farm_id,farmer_details.farmer_name ,farm_details.state,farm_details.district,farm_details.taluka,farm_details.village,farm_details.contract_id 
    from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farmer_id AND state='${state}' and District= '${district}' and taluka='${taluka}' and village='${village}'`);
    var query=client.query(farm_query);
    // console.log(farm_query);
    // console.log(query);
    query.on('row',function(row){
     result.push(row);
     
    })
    query.on('end',function(){
    // console.log(result);
     return res.json(result);
    }); 
   
}



exports.viewimage = function(req,res){
  var result=[];
  var id= req.params.id;
  // console.log(id);
  var select_query =(`select farmer_details.farmer_name,farm_details.farm_id,farm_details.state,farm_details.district,farm_details.taluka,
  farm_details.village,executive_details.executive_id,image.image,image.ndvi_image
  from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farm_id
  inner join executive_details on farm_details.executive_id = executive_details.executive_id
  inner join image on farm_details.farm_id=image.farm_id where farm_details.farm_id ='${id}'`);
   var query = client.query(select_query);
   
   query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){
   
    return res.json(result);
  });
  }


exports.ndvi_image = function(req,res){
  let id= req.params.id;
  console.log(id);
  var result=[];
  var query_edit=`select farmer_details.farmer_name,farm_details.farm_id,farm_details.state,farm_details.district,farm_details.taluka,
  farm_details.village,executive_details.executive_id,image.ndvi_image
  from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farm_id
  inner join executive_details on farm_details.executive_id = executive_details.executive_id
  inner join image on farm_details.farm_id=image.farm_id where farm_details.farm_id ='${id}'`;
  var query = client.query(query_edit);
  // console.log(query);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){ 
    // console.log(result);
    return res.json(result);
  });
  
}
exports.original_image = function(req,res){
  let id= req.params.id;
  console.log(id);
  var result=[];
  var query_edit=`select farmer_details.farmer_name,farm_details.farm_id,farm_details.state,farm_details.district,farm_details.taluka,
  farm_details.village,executive_details.executive_id,image.image
  from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farm_id
  inner join executive_details on farm_details.executive_id = executive_details.executive_id
  inner join image on farm_details.farm_id=image.farm_id where farm_details.farm_id ='${id}'`;
  var query = client.query(query_edit);
  // console.log(query);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){ 
    // console.log(result);
    return res.json(result);
  });
}

exports.fromdate= function(req,res){
  let id= req.params.Date;
  console.log(id);
  var result=[];
  // var query_edit=`select farmer_details.farmer_name,farm_details.farm_id,farm_details.state,farm_details.district,farm_details.taluka,
  // farm_details.village,executive_details.executive_id,image.image
  // from farmer_details inner join farm_details on farmer_details.farmer_id = farm_details.farm_id
  // inner join executive_details on farm_details.executive_id = executive_details.executive_id
  // inner join image on farm_details.farm_id=image.farm_id where farm_details.farm_id ='${id}'`;
  // var query = client.query(query_edit);
  // // console.log(query);
  // query.on('row',function(row){
  //   result.push(row);
  // })
  // query.on('end',function(){ 
  //   // console.log(result);
  //   return res.json(result);
  // });
}



exports.edit = function(req,res){
  let id = req.params.val;
  console.log(id);
  var result=[];
  var edit_query=`select farm_details.farm_id,farmer_details.mobile_no,farm_details.state,farm_details.district,
  farm_details.taluka,farm_details.village,farm_details.area,farm_details.contract_id,executive_details.executive_id,
  executive_details.name,executive_details.executive_mobile_no from farmer_details inner join farm_details on farmer_details.farmer_id = 
  farm_details.farmer_id inner join executive_details on farm_details.executive_id = executive_details.executive_id
  where farm_details.farm_id ='${id}'`;
  
  var query = client.query(edit_query);
  console.log(query);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){ 
    return res.json(result);
  });
}



exports.map_data = function(req,res){
  var data=[];
  // var map_query=`SELECT row_to_json(fc) FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
  // FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry,row_to_json((id, name)) As properties FROM farm_details As lg) As f) As fc`;
 var map_query=`SELECT row_to_json(fc)
 FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
  FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::
  json As geometry,row_to_json(( farmer_id,contract_id)) As properties FROM farm_details As lg) As f) As fc`;

  //   var query = client.query(coffee_query);
//   query.on("row", function (row) {
//     // result.addRow(row); 
//     data.push(row);   
// });

// // query.on("end", function (result) {
// //   var data = result.rows[0].row_to_json // Save the JSON as variable data
// query.on('end',function(){
//   console.log(data);
//   return res.json(data);
// });

var query = client.query(map_query);
// console.log(query);
// query.on("row", function (row, result) {
//     result.addRow(row);
    
// });
// // console.log(result);
// // console.log(row);
// query.on("end", function (result) {
//   //   var rdata=(result.rows[0].row_to_json);
//   //   // res.end();
//   //   // res.render({
//   //   //   jsonData: data // Pass data to the View
//   // // });
//   // console.log(rdata);
//   // return res.json(rdata);
//   var data = result.rows[0].row_to_json // Save the JSON as variable data
//   res.render( {
//           jsonData: data // Pass data to the View
//   });
// });
query.on("row", function (row, result) {
  result.addRow(row);
  
});
query.on("end", function (result) {

  return res.json(result.rows[0].row_to_json);

});
};

exports.fmid = function(req,res){
  var id=req.params.id;
  console.log(id);
  var result=[];
  var map_query=`select farm_details.farm_id,farmer_details.farmer_name,farmer_details.mobile_no,farm_details.state,farm_details.district,
  farm_details.taluka,farm_details.village,farm_details.area,farm_details.contract_id,executive_details.executive_id,
  executive_details.name,executive_details.executive_mobile_no from farmer_details inner join farm_details on farmer_details.farmer_id = 
  farm_details.farmer_id inner join executive_details on farm_details.executive_id = executive_details.executive_id
  where farm_details.farm_id ='${id}'`;
  var query = client.query(map_query);
  console.log(query);
  query.on('row',function(row){
    result.push(row);
  })
  query.on('end',function(){ 
    // console.log(result)
    return res.json(result);
  });
}

exports.map_data1 = function(req,res){
  var id=req.params.id;
  console.log(id);
  var result=[];

  var map_query=`SELECT row_to_json(fc)
  FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
  FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::
  json As geometry,row_to_json(( farmer_id,contract_id)) As properties FROM farm_details As lg where "farm_id"=${id})  As f) As fc `;

  // var map_query=`SELECT row_to_json(fc)
  // FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
  // FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::
  // json As geometry FROM samp As lg where "farm_id"=${id})  As f) As fc `;


  var query = client.query(map_query);

  query.on("row", function (row, result) {
    result.addRow(row);
    
  });
  query.on("end", function (result) {

    console.log(result);
  
    return res.json(result.rows[0].row_to_json);
  
  });

}



exports.crop = function(req,res){
  var crop = req.params.crop;
  console.log(crop);;
  var result=[];
  var crop_query = '';
  var query = client.query(edit_query);
  console.log(query);
  query.on('row',function(row){
    result.push(row);
  })

}


//get single customer
exports.single_customer = function (req, res) {
   con.query(`SELECT * FROM customers where id = ${req.params.id}`, function (error, results, fields) {
   if (error) throw error;
   res.json(results);
 });
};

exports.smpl = function(req,res){
  
  // //Convert coordinates to geometry datatype
  // 84.3631717935205 18.674651093874445,84.3631221726537 18.674457025181823,84.3629863858223 18.67449228154021,84.3630296364427 18.67467396283837,84.3631040677428 18.67468349157241,84.3631717935205 18.674651093874445
  query1=`SELECT ST_GeomFromText('POLYGON((84.3631717935205 18.674651093874445,84.3631221726537 18.674457025181823,84.3629863858223 18.67449228154021,84.3630296364427 18.67467396283837,84.3631040677428 18.67468349157241,84.3631717935205 18.674651093874445
  ))')`;
  var query = client.query(query1);
  console.log(query);
  query.on("row", function (row, result,end) {
      result.addRow(row);
      saveShape(result.rows[0].st_geomfromtext);
  });

  function saveShape(geom) {
                 var insert_query =`INSERT INTO  samp VALUES(\'`+geom+`\')`;
              var query = client.query(insert_query);
              
  }
  
}




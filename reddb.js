
//Connect redisdatabase
var redis = require('redis');
var client = redis.createClient({host : 'localhost',port : 6379});

client.on('connect',function(){ 
  console.log(" Redis connected");
})

module.exports=client; 
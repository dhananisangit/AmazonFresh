/*var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

*//**
 * Connects to the MongoDB Database with the provided URL
 *//*
exports.connect = function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected?");
      callback(db);
    });
};

*//**
 * Returns the collection on the selected database
 *//*
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};





//var MongoClient = require('mongodb').MongoClient;
//var db;
//var connected = false;
//var arrayOfPools= [];
///**
// * Connects to the MongoDB Database with the provided URL
// */
//
//for(var i=0;i<1;i++){
//
//	 MongoClient.connect("mongodb://localhost:27017/AmazonFresh",function(err, _db){
//	      if (err) { throw new Error('Could not connect: '+err); }
//	      db = _db;
//	      connected = true;
//	      console.log(connected +" is connected?");
//	      arrayOfPools.push(db);
//	  });
//	
//}
//function getConnectionFromPool(){
//	var connection = arrayOfPools.pop();
//	return connection;
//}
//function releaseConnectionFromPool(connection){
//	arrayOfPools.push(connection);
//}
//
//exports.connect = function(url, callback){
//
//	console.log("In fetching connection from pool");
//	connected=getConnectionFromPool();
//	callback(connected);
//
//};
//
//exports.disconnect = function(db, callback){
//
//	console.log("In release connection from pool");
//	releaseConnectionFromPool(connected);
//
//};
//
///**
// * Returns the collection on the selected database
// */
//exports.collection = function(name){
//    if (!connected) {
//      throw new Error('Must connect to Mongo before calling "collection"');
//    } 
//    return db.collection(name);
//  
//};*/




var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var arrayOfPools= [];
/**
 * Connects to the MongoDB Database with the provided URL
 */

for(var i=0;i<100;i++){

	 MongoClient.connect("mongodb://localhost:27017/AmazonFresh",function(err, _db){
	      if (err) { throw new Error('Could not connect: '+err); }
	      db = _db;
	      connected = true;
	      //console.log(connected +" is connected?");
	      arrayOfPools.push(db);
	  });
	
}
function getConnectionFromPool(){
	var connection = arrayOfPools.pop();
	return connection;
}
function releaseConnectionFromPool(connection){
	arrayOfPools.push(connection);
}

exports.connect = function(url, callback){

	console.log("In fetching connection from pool");
	connected=getConnectionFromPool();
	callback(connected);

};

exports.disconnect = function(db, callback){

	console.log("In release connection from pool");
	releaseConnectionFromPool(connected);

};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};

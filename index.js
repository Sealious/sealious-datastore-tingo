var Promise = require("bluebird");
var Sealious = require("sealious");
var path = require("path");
var fs = require("fs");
var TingoDB = require('tingodb')();

var db = null;

var datastore_mongo = new Sealious.ChipTypes.Datastore("mongo");

Sealious.ConfigManager.set_default_config(
	"datastore_mongo", 
	{
		embedded: false,
		host: 'localhost',
		port: 27017,
		db_name: 'sealious'
	}
);

var DatastoreTingo = new function(){
	this.start = function(){
		var storage_path = path.resolve("./db");

		try{
			var stats = fs.lstatSync(storage_path);			
		}catch(error){
			//the dir does not exist
			fs.mkdirSync(storage_path);			
		}

		db = new TingoDB.Db('./db', {});
		console.log("Statring datastore tingo");
		return Promise.resolve();
	}
}

module.exports = DatastoreTingo;




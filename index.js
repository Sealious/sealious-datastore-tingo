var Promise = require("bluebird");
var Sealious = require("sealious");
var Path = require("path");
var Fs = require("fs");
var TingoDB = require('tingodb')();

var db = null;

var DatastoreTingo = new function(){
	this.start = function(){
		var storage_path = Path.resolve("./db");

		try{
			var stats = Fs.lstatSync(storage_path);			
		}catch(error){
			//the dir does not exist
			Fs.mkdirSync(storage_path);			
		}

		db = new TingoDB.Db('./db', {});
		console.log("Statring datastore tingo");
		return Promise.resolve();
	}
}

module.exports = DatastoreTingo;




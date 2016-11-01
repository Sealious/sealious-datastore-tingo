var Promise = require("bluebird");
var Path = require("path");
var Fs = require("fs");
var TingoDB = require('tingodb')();
var DbsCommonPart = require('sealious-datastore-dbs-common-part');

module.exports = function(app){
	const DatastoreTingo = app.createDatastore({name:"tingo"});

	var private = {db: null};

	DatastoreTingo.start = function(){
		var storage_path = Path.resolve("./db");

		try{
			var stats = Fs.lstatSync(storage_path);
		}catch(error){
			//the dir does not exist
			Fs.mkdirSync(storage_path);
		}

		private.db = new TingoDB.Db('./db', {});

		return this.post_start();
	};

	DbsCommonPart(app, DatastoreTingo,private);
};

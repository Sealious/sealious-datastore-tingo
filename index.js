var Promise = require("bluebird");
var Sealious = require("sealious");
var Path = require("path");
var Fs = require("fs");
var TingoDB = require('tingodb')();
var DbsCommonPart = require('sealious-datastore-dbs-common-part');

var private = {db: null};

var DatastoreTingo = new Sealious.ChipTypes.Datastore("tingodb");

Sealious.ConfigManager.set_config("tingodb_datastore", {
	"storage_dir": "./db"
});

DatastoreTingo.start = function(){
	var storage_path = Path.resolve("./db");

	try{
		var stats = Fs.lstatSync(storage_path);			
	}catch(error){
		//the dir does not exist
		Fs.mkdirSync(storage_path);			
	}

	private.db = new TingoDB.Db('./db', {});

	return Promise.resolve();
};

DatastoreTingo = DbsCommonPart(DatastoreTingo,private);		

module.exports = DatastoreTingo;
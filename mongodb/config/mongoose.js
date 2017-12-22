var mongoose = require('mongoose');
var config = require('./config');
mongoose.Promise = global.Promise;
module.exports = function(){
  var db = mongoose.connect(config.mongodb,{useMongoClient:true});
  console.log(1)
  // require('../model/user.model')
  return db;
}
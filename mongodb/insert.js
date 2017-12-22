var mongoose = require('mongoose');
var connection = require('./config/mongoose')
var db = connection()
require('./model/user.model')
var User = mongoose.model('User')

var user = new User({
  uid: '1234564',
  username: 'allen'
})

/*User.on('index',function (err) {
  if(err){
    console.log(1,err)
    return;
  }
  user.save(function(err){
    if(err){
      console.log(2, err);
      return;
    }else{
      console.log('successful')
    }
  })
})*/

user.save(function(err){
  /*if(err){
    console.log(2,err);
    return;
  }else{
    console.log('successful')
  }*/
  db.close()
})
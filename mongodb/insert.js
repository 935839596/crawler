var mongoose = require('mongoose');
var connection = require('./config/mongoose')
var db = connection()
require('./model/user.model')
var User = mongoose.model('User')

var user = new User({
  uid: '1234564',
  username: 'allen'
})


var user2 = {
  uid: '112',
  username: 'allenchen'
}
user2 = new User(user2)

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
  // db.close()
})

user2.save(function(ee){
  console.log(1)
  //
  db.close()
})

